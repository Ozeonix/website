-- Partner payouts
CREATE TABLE public.payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_id uuid REFERENCES public.referrals(id) ON DELETE SET NULL,
  amount numeric(12,2) NOT NULL DEFAULT 0,
  method text,
  reference text,
  note text,
  status public.payout_status NOT NULL DEFAULT 'pending',
  paid_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payouts TO authenticated;
GRANT ALL ON public.payouts TO service_role;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
CREATE INDEX payouts_partner_id_idx ON public.payouts (partner_id);

CREATE POLICY "Partners can view their own payouts"
ON public.payouts FOR SELECT TO authenticated
USING (partner_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create payouts"
ON public.payouts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update payouts"
ON public.payouts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete payouts"
ON public.payouts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_payouts_updated_at
BEFORE UPDATE ON public.payouts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Service packages available for online purchase
CREATE TABLE public.service_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(12,2) NOT NULL,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_packages TO authenticated;
GRANT ALL ON public.service_packages TO service_role;
ALTER TABLE public.service_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active packages"
ON public.service_packages FOR SELECT TO anon, authenticated
USING (is_active OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage packages"
ON public.service_packages FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_service_packages_updated_at
BEFORE UPDATE ON public.service_packages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.service_packages (slug, name, description, price, features, sort_order) VALUES
('starter-website', 'Starter Website', 'A 5-page business website with contact form, SEO basics and mobile-first design.', 24999,
 '["Up to 5 pages","Mobile-first responsive design","Contact form + WhatsApp button","Basic on-page SEO","1 month free support"]'::jsonb, 1),
('business-pro', 'Business Pro', 'A larger marketing site with blog, analytics and advanced SEO for growing businesses.', 59999,
 '["Up to 15 pages","Blog / news section","Google Analytics + Search Console","Advanced local SEO for Nepal","3 months free support"]'::jsonb, 2),
('software-advance', 'Software Advance', 'Advance deposit for custom CRM, ERP, LMS or mobile app projects.', 99999,
 '["Custom CRM / ERP / LMS scope","Dedicated project manager","Cloud deployment & CI/CD","Training and documentation","6 months free support"]'::jsonb, 3);

-- Online payments (eSewa)
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_uuid text NOT NULL UNIQUE,
  purpose text NOT NULL DEFAULT 'invoice',
  package_slug text,
  amount numeric(12,2) NOT NULL,
  total_amount numeric(12,2) NOT NULL,
  status text NOT NULL DEFAULT 'PENDING',
  provider text NOT NULL DEFAULT 'esewa',
  environment text NOT NULL DEFAULT 'uat',
  product_code text NOT NULL,
  ref_id text,
  transaction_code text,
  payer_name text,
  payer_email text,
  payer_phone text,
  referral_code text,
  note text,
  raw_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE INDEX payments_created_at_idx ON public.payments (created_at DESC);

CREATE POLICY "Admins can view payments"
ON public.payments FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Lead notification log
CREATE TABLE public.lead_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_id uuid REFERENCES public.referrals(id) ON DELETE CASCADE,
  recipient text NOT NULL,
  audience text NOT NULL DEFAULT 'admin',
  channel text NOT NULL DEFAULT 'email',
  subject text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  sent boolean NOT NULL DEFAULT false,
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lead_notifications TO authenticated;
GRANT ALL ON public.lead_notifications TO service_role;
ALTER TABLE public.lead_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view lead notifications"
ON public.lead_notifications FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
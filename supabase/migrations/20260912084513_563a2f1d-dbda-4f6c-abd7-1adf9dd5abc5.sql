DROP POLICY "Anyone can view active packages" ON public.service_packages;

CREATE POLICY "Visitors can view active packages"
ON public.service_packages FOR SELECT TO anon
USING (is_active);

CREATE POLICY "Signed-in users can view packages"
ON public.service_packages FOR SELECT TO authenticated
USING (is_active OR public.has_role(auth.uid(), 'admin'));
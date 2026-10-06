# Secure Team Inquiry Inbox

## Goal
Keep every accepted project brief and contact submission in a protected team inbox, even when notification email is delayed, suppressed, or fails.

## What will change
- Continue saving each inquiry before attempting any email, and reject a submission only if secure storage itself fails.
- Add inbox workflow fields for new/reviewed/archived state, review time, internal team notes, and team-email delivery outcome.
- Restrict inbox reading and updates to signed-in administrators through database rules and authenticated server actions.
- Upgrade the current Admin “Contact leads” area into an “Inquiry inbox” with search, status filters, unread counts, full inquiry details, delivery status, notes, and CSV export.
- Record the admin notification result against the saved inquiry without treating email failure as form failure.
- Confirm successful form submissions tell visitors their brief is securely received, without promising email delivery.

## Technical details
- Apply one Ozeonix Cloud migration to extend `contact_submissions`, grant only authenticated access needed by the admin policies, and add admin-only update access.
- Use authenticated server functions for inbox list/update operations; no private inquiry data is exposed to visitors or partners.
- Preserve existing form fields, referral attribution, notification templates, and the protected admin area.

## Validation
- Run type checking and the existing accessibility checks.
- Verify unauthenticated visitors cannot access inbox data.
- Verify an administrator can search, review, annotate, and archive inquiries.
- Verify a saved inquiry remains visible when its email result is failed or suppressed.

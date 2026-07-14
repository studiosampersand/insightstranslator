# Prototype scope and boundaries

## Included

The standalone version demonstrates interface design, CSV profile selection, common-ground calculations, multilingual presentation, offline installation and deterministic sample rewrites.

## Deliberately excluded

- Azure deployment
- Entra SSO and MFA
- Microsoft Graph or SharePoint access
- Teams and Outlook add-ins
- HaloPSA integration
- Internal AI-agent connection
- Screenshot OCR or multimodal interpretation
- Message sending or insertion
- HR reporting, sentiment scoring or employee monitoring

## Production migration

The interface and CSV schema are designed so that the local profile loader can later be replaced by an authenticated internal API. The deterministic rewrite function can likewise be replaced by the organisation's internal agent while the user workflow remains largely unchanged.

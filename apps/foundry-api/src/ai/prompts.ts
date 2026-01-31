export const PITCH_TO_SPEC_PROMPT = `
You are an expert software architect. Given a startup pitch, generate a JSON specification for a full-stack monorepo.
The JSON must follow this schema:
{
  "name": "App Name",
  "slug": "app-slug",
  "entities": [{ "name": "Entity", "fields": [{ "name": "field", "type": "String" }] }],
  "roles": ["Admin", "User"],
  "integrations": ["stripe"]
}

Pitch: {{pitch}}
`;

export const SECURITY_AUDIT_PROMPT = `
Review the following app specification for security vulnerabilities (OWASP Top 10) and suggest RBAC rules.
Spec: {{spec}}
`;

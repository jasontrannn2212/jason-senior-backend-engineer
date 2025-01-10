## Additional comments for improvement.

- Ensure handling retry or error handling mechanisms in place in case the API call fails.
- Implement rate-limiting or throttling strategies applied to avoid abuse.
- Consider adding a history of score changes in an external logging service to ensure transparency and traceability.
- Assume that we use JWT for handling user authentication, but there are other solutions that we can consider (Oauth2, SAML, Session Tokens).
- Mention any potential plans for pagination or load-more functionality if the list of users is likely to grow beyond the top 10.
- Consider providing an admin interface to manage user scores or manually adjust the leaderboard if needed.

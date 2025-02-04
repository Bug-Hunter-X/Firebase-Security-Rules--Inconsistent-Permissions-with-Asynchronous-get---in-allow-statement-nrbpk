The solution involves restructuring the data to avoid the asynchronous `get()` call within the security rule.  One approach is to denormalize the data by storing necessary permissions information directly with each user.

```javascript
// Security Rules (Solution)

rules_version = '2';

match /databases/{database}/documents/users/{userId} {
  allow read: if get(/databases/$(database)/documents/users/$(userId)).data.admin == true || auth.uid == "adminUserId";
  allow write: if auth.uid == userId || auth.uid == "adminUserId"; // or more appropriate write conditions
}

```
This revised version avoids `get()` in the `allow` statement.  The `admin` property is directly accessed within the `allow` conditions, resolving the asynchronous issue.  Alternatively, you might consider using a more structured data model, for instance, including user roles in a separate location that has faster lookups than a deeply nested structure.
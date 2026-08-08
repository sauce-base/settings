# Settings Module

The Settings module provides account settings for authenticated users. It works
with the core `User` model, Spatie Media Library, and the Auth module's
social-account integration.

## What it provides

### User settings

- Profile overview at `/settings/profile`.
- Profile editing for name and email address.
- Avatar upload and removal.
- Password changes requiring the current password and confirmation of the new
  password.
- Connected social-provider display and disconnect actions when the Auth
  module has configured providers.
- Shared Settings navigation that other modules can extend.

All web routes use `auth`, `verified`, and `role:admin|user` middleware. An
unverified user is redirected to the email-verification flow. The module does
not own a user or profile database table; profile fields are stored on the core
`User` model.

## Installation

Install the module through Composer, run application migrations, and rebuild
the frontend:

```bash
composer require saucebase/settings
php artisan migrate
npm run build
```

The module has no module-owned Eloquent tables, seeders, or required
environment variables. The Auth module is required for connected social
provider functionality; the profile and password flows use the core user model.

For Docker-based development, run the migration inside the application
container before building the frontend:

```bash
docker compose exec app php artisan migrate
npm run build
```

## User settings behavior

### Profile updates

`PATCH /settings/profile/info` validates a required name and unique email
address, excluding the current user's email from the uniqueness check.

### Avatar management

`POST /settings/profile/avatar` accepts JPEG, PNG, GIF, or WebP images up to
2 MB. A new upload clears the existing `avatars` media collection before the
new file is stored. `DELETE /settings/profile/avatar` removes only the uploaded
file.

The avatar display fallback is:

1. The uploaded Media Library avatar.
2. The social-provider avatar stored on the user.
3. The application's default avatar.

Removing an uploaded avatar therefore does not remove a social-provider avatar
that can still be used as the fallback.

### Password changes

`PUT /settings/profile/password` requires the current password and a confirmed
new password using Laravel's configured password defaults. After a successful
change, the controller hashes the new password, sends the core application's
`PasswordChangedNotification`, displays a success toast, and redirects to the
profile page.

The notification is intentionally owned by the core application at
`app/Notifications/PasswordChangedNotification.php`.

### Social providers

The profile page reads connected providers from the Auth module's `Sociable`
integration. Connect and disconnect routes belong to Auth, not Settings. The
provider section is shown only when configured provider data and the Auth
routes are available.

## Routes and navigation

| Method | URI | Route name | Purpose |
| --- | --- | --- | --- |
| `GET` | `/settings` | `settings.index` | Redirect to the profile page |
| `GET` | `/settings/profile` | `settings.profile` | View profile |
| `GET` | `/settings/profile/edit` | `settings.profile.edit` | Edit profile and avatar |
| `PATCH` | `/settings/profile/info` | `settings.profile.update-info` | Save name and email |
| `POST` | `/settings/profile/avatar` | `settings.profile.update-avatar` | Upload avatar |
| `DELETE` | `/settings/profile/avatar` | `settings.profile.delete-avatar` | Remove uploaded avatar |
| `GET` | `/settings/profile/password` | `settings.profile.password.edit` | Show password form |
| `PUT` | `/settings/profile/password` | `settings.profile.password.update` | Change password |

The module contributes these navigation entries:

- `user`: Settings link.
- `settings`: Profile sidebar link.
- `secondary`: Settings link with the module's secondary navigation badge.

Another module can add an item to the Settings sidebar from its own
`routes/navigation.php`:

```php
use AppFacades\Navigation;
use App\Navigation\Section;

Navigation::add('Billing', fn () => route('billing.settings'), function (Section $section) {
    $section->attributes([
        'group' => 'settings',
        'slug' => 'billing',
        'icon' => 'credit-card',
        'order' => 30,
    ]);
});
```


## Boundaries

The base Settings module does not provide:

- Per-user preferences in the global settings repository.
- Audit history or value-change history.
- Rollback, approvals, scheduled changes, or environment promotion.
- Application-wide branding, metadata, or global settings.

These capabilities require separate ownership and lifecycle decisions.

## Testing

Run the module's PHPUnit tests with the module filter:

```bash
php artisan test --compact --testsuite=Modules --filter='^Modules\\Settings\\Tests'
```

Run the Settings Playwright project when frontend behavior changes:

```bash
npx playwright test --project="@settings*"
```

The test suite covers redirect behavior, avatar upload/removal, and browser-level
profile behavior.

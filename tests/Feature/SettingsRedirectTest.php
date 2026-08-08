<?php

namespace Modules\Settings\Tests\Feature;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingsRedirectTest extends TestCase
{
    use RefreshDatabase;

    public function test_settings_root_redirects_to_profile(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $user->assignRole(Role::USER);

        $this->actingAs($user)
            ->get(route('settings.index'))
            ->assertRedirect(route('settings.profile'));
    }
}

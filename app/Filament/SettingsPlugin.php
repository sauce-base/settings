<?php

namespace Modules\Settings\Filament;

use App\Filament\ModulesFilamentPlugin;
use Filament\Contracts\Plugin;
use Filament\Panel;

class SettingsPlugin implements Plugin
{
    use ModulesFilamentPlugin;

    public function getModuleName(): string
    {
        return 'Settings';
    }

    public function getId(): string
    {
        return 'settings';
    }

    public function boot(Panel $panel): void
    {
        //
    }
}

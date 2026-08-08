<?php

use Saucebase\Breadcrumbs\Breadcrumbs;
use Saucebase\Breadcrumbs\Generator as Trail;

// Profile view
Breadcrumbs::for('settings.profile', function (Trail $trail) {
    $trail->parent('dashboard');
    $trail->push('settings.profile', route('settings.profile'));
});

// Profile edit
Breadcrumbs::for('settings.profile.edit', function (Trail $trail) {
    $trail->parent('settings.profile');
    $trail->push('settings.profile.edit', route('settings.profile.edit'));
});

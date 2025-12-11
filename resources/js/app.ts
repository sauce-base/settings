// import type { App } from 'vue';
import { useNavigationStore } from '@modules/Navigation/resources/js/stores';
import { SettingsIcon } from 'lucide-vue-next';

import '../css/style.css';

/**
 * Settings module setup
 * Called during app initialization before mounting
 */
export function setup() {
    console.debug('Settings module loaded');

    const navigationStore = useNavigationStore();

    // Add Settings item to NavUser
    const settingsMenuItem = {
        id: 'settings',
        type: 'link' as const,
        title: 'Settings',
        icon: SettingsIcon,
        priority: 50,
        url: route('settings.index'),
        isActive: route().current('settings.index'),
    };

    navigationStore.addItem(
        settingsMenuItem,
        { area: 'user' },
    );

    navigationStore.addItem(
        settingsMenuItem,
        { area: 'secondary' },
    );
}

/**
 * Settings module after mount logic
 * Called after the app has been mounted
 */
export function afterMount(/* app: App */) {
    console.debug('Settings module after mount logic executed');
}

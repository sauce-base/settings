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

    navigationStore.addItem(
        {
            id: 'settings',
            type: 'link',
            title: 'Settings',
            icon: SettingsIcon,
            priority: 50,
            url: route('settings.index'),
            isActive: () => route().current('settings.*'),
        },
        { area: 'user' },
    );
}

/**
 * Settings module after mount logic
 * Called after the app has been mounted
 */
export function afterMount(/* app: App */) {
    console.debug('Settings module after mount logic executed');
}

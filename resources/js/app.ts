// import type { App } from 'vue';
import { useNavigationStore } from '@modules/Navigation/resources/js/stores';
import { SettingsIcon } from 'lucide-vue-next';
import { VueFinalModal, useModal, useVfm } from 'vue-final-modal';
import SettingsModal from './components/SettingsModal.vue';

import '../css/style.css';

/**
 * Settings module setup
 * Called during app initialization before mounting
 */
export function setup() {
    console.debug('Settings module loaded');

    const navigationStore = useNavigationStore();

    // Register settings modal
    useModal({
        component: VueFinalModal,
        attrs: {
            modalId: 'settings',
        },
        slots: {
            default: SettingsModal,
        },
    });

    // Add Settings item to NavUser
    navigationStore.addItem(
        {
            id: 'settings',
            type: 'action',
            title: 'Settings',
            icon: SettingsIcon,
            priority: 50,
            action: () => {
                const vfm = useVfm();
                const r = vfm.open('settings');

                console.log('Settings modal opened', r);
            },
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

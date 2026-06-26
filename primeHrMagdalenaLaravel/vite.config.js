import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command, mode }) => {
    const isProduction = mode === 'production';
    
    return {
        plugins: [
            laravel({
                input: [
                    // css shit
                    'resources/css/app.css',
                    'resources/css/admin.css',
                    'resources/css/adminDashboard.css',
                    'resources/css/adminAttendance.css',
                    'resources/css/adminRecruitment.css',
                    'resources/css/adminTraining.css',
                    'resources/css/adminChatbot.css',
                    'resources/css/adminPerformance.css',
                    'resources/css/adminDepartment.css',
                    'resources/css/employeeWizard.css',
                    'resources/css/adminPersonnel.css',
                    'resources/css/adminNotification.css',
                    'resources/css/adminPayroll.css',
                    'resources/css/adminLeaveandBenefits.css',
                    'resources/css/joborder.css',
                    'resources/css/permanent.css',
                    // js shit
                    'resources/js/app.js',
                    'resources/js/employeeWizard.js',
                    'resources/js/adminPersonnel.js',
                    'resources/js/personnelTopbar.js',
                ],
                refresh: true,
                // Add this for production
                buildDirectory: 'build',
            }),
            tailwindcss(),
        ],
        server: {
            watch: {
                ignored: ['**/storage/framework/views/**'],
            },
        },
        // Add base URL for production
        base: isProduction ? '/build/' : '/',
        build: {
            outDir: 'public/build',
            manifest: true,
            // Ensure assets are copied properly
            copyPublicDir: true,
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                },
            },
        },
    };
});
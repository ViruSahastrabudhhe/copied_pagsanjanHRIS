import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
    plugins: [
        laravel({
            input: [
                //css
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
                //js
                'resources/js/app.js',
                'resources/js/employeeWizard.js',
                'resources/js/adminPersonnel.js',
                'resources/js/personnelTopbar.js'
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
    build: {
        outDir: 'public/build',
        manifest: true,
        rollupOptions: {
            input: {
                // css
                'app.css': 'resources/css/app.css',
                'admin.css': 'resources/css/admin.css',
                'adminDashboard.css': 'resources/css/adminDashboard.css',
                'adminAttendance.css': 'resources/css/adminAttendance.css',
                'adminRecruitment.css': 'resources/css/adminRecruitment.css',
                'adminTraining.css': 'resources/css/adminTraining.css',
                'adminChatbot.css': 'resources/css/adminChatbot.css',
                'adminPerformance.css': 'resources/css/adminPerformance.css',
                'adminDepartment.css': 'resources/css/adminDepartment.css',
                'employeeWizard.css': 'resources/css/employeeWizard.css',
                'adminPersonnel.css': 'resources/css/adminPersonnel.css',
                'adminNotification.css': 'resources/css/adminNotification.css',
                'adminPayroll.css': 'resources/css/adminPayroll.css',
                'adminLeaveandBenefits.css': 'resources/css/adminLeaveandBenefits.css',
                'joborder.css': 'resources/css/joborder.css',
                'permanent.css': 'resources/css/permanent.css',
                // JS entries
                'app': 'resources/js/app.js',
                'employeeWizard': 'resources/js/employeeWizard.js',
                'adminPersonnel': 'resources/js/adminPersonnel.js',
                'personnelTopbar': 'resources/js/personnelTopbar.js',
            }
        }
    }
});

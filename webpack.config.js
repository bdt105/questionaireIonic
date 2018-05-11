var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

useDefaultConfig.dev.resolve.alias = {
    "@appSharedServices": path.resolve('./src/questionnaireShared/services/'),
    "@appSharedComponents": path.resolve('./src/questionnaireShared/components/'),
    "@pages": path.resolve('./src/pages/'),
    "@services": path.resolve('./src/services/'),
    "@components": path.resolve('./src/components'),      
    "@sharedComponents": path.resolve('./src/angularShared/components/'),
    "@sharedServices": path.resolve('./src/angularShared/services/')
};

useDefaultConfig.prod.resolve.alias = {
    "@appSharedServices": path.resolve('./src/questionnaireShared/services/'),
    "@appSharedComponents": path.resolve('./src/questionnaireShared/components/'),
    "@pages": path.resolve('./src/pages/'),
    "@services": path.resolve('./src/services/'),
    "@components": path.resolve('./src/components'),      
    "@sharedComponents": path.resolve('./src/angularShared/components/'),
    "@sharedServices": path.resolve('./src/angularShared/services/')
};
/**
 * export the update ionic webpack configs (this still includes both dev & prod webpack configs)
 */
module.exports = function () {
    return useDefaultConfig;
};
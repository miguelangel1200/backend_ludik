"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activities_1 = require("../controllers/activities");
const router = (0, express_1.Router)();
router.get('/', activities_1.getActivities);
router.get('/:id', activities_1.getActivity);
router.post('/', activities_1.postActivity);
router.put('/:id', activities_1.putActivity);
router.delete('/:id', activities_1.deleteActivity);
exports.default = router;
//# sourceMappingURL=activity.js.map
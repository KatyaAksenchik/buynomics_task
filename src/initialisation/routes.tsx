import React from "react";
import {
    Routes,
    Route
} from "react-router-dom";
import { ROUTE_PATH } from '../constants/routes'
import { NotExistPageView } from '../views/NotExistPageView/NotExistPageView';
import { IntermediariesView } from '../views/IntermediariesView/IntermediariesView';
import { IntermediaryAddView } from '../views/IntermediaryAddView/IntermediaryAddView';
import { IntermediaryEditView } from '../views/IntermediaryEditView/IntermediaryEditView';


export const routes = (
    <Routes>
        <Route
            path={ROUTE_PATH.home}
            element={<IntermediariesView />}
        />
        <Route
            path={ROUTE_PATH.intermediaryAdd}
            element={<IntermediaryAddView />}
        />
        <Route
            path={ROUTE_PATH.intermediaryEdit}
            element={<IntermediaryEditView />}
        />
        <Route
            path="*"
            element={<NotExistPageView />}
        />
    </Routes>
);

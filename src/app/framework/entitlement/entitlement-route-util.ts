export class EntitlementRouteUtil {
    private static routePermissions: { [route: string]: boolean } = {};
    private static permissionExemptedRoutes: string[] = [];

    static setRoutePermissions(routePermissions: {
        [route: string]: boolean;
    }): void {
        EntitlementRouteUtil.routePermissions = routePermissions;
    }

    static addRoutePermission(route: string, permission: boolean): void {
        EntitlementRouteUtil.routePermissions[route] = permission;
    }

    static updateRoutePermission(routePermissions: {
        [route: string]: boolean;
    }): void {
        for (const route in routePermissions) {
            if (route) {
                EntitlementRouteUtil.routePermissions[route] =
                    routePermissions[route];
            }
        }
    }

    static clearRoutePermission(route: string, isRemove = false): void {
        EntitlementRouteUtil.routePermissions[route] = false;
        if (isRemove) {
            delete EntitlementRouteUtil.routePermissions[route];
        }
    }

    static clearRoutePermissions(): void {
        EntitlementRouteUtil.routePermissions = {};
    }

    static hasRoutePermission(route: string): boolean {
        route = EntitlementRouteUtil.getRouteString(route);
        return EntitlementRouteUtil.routePermissions[route];
    }

    static isExemptedRoute(route: string): boolean {
        route = EntitlementRouteUtil.getRouteString(route);
        return EntitlementRouteUtil.permissionExemptedRoutes.some(
            exemptedRoute => exemptedRoute === route
        );
    }

    static setExemptedRoutes(exemptedRoutes: string[]): void {
        EntitlementRouteUtil.permissionExemptedRoutes = exemptedRoutes;
    }

    static clearExemptedRoutes(): void {
        EntitlementRouteUtil.permissionExemptedRoutes = [];
    }

    static updateExemptedRoutes(
        exemptedRoutes: string[],
        isRemove = false
    ): void {
        if (isRemove) {
            exemptedRoutes.forEach(exemptedRoute => {
                const index = EntitlementRouteUtil.permissionExemptedRoutes.indexOf(
                    exemptedRoute
                );
                EntitlementRouteUtil.permissionExemptedRoutes.splice(index, 1);
            });
        } else {
            exemptedRoutes.forEach(exemptedRoute => {
                if (
                    !EntitlementRouteUtil.permissionExemptedRoutes.some(
                        route => route === exemptedRoute
                    )
                ) {
                    EntitlementRouteUtil.permissionExemptedRoutes.push(
                        exemptedRoute
                    );
                }
            });
        }
    }

    private static getRouteString(route: string): string {
        if (route.indexOf('/') !== -1) {
            const splitRoute = route.split('/');
            return splitRoute[splitRoute.length - 1];
        }
        return route;
    }
}

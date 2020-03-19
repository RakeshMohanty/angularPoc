export class EntitlementUtil {
    private static permissions: string[] = [];

    static setPermissions(permissions: string[]): void {
        if (!permissions || !permissions.length) {
            return;
        }
        EntitlementUtil.permissions = permissions;
    }

    static hasPermission(entitlements: string[]): boolean {
        if (!EntitlementUtil.permissions.length) {
            return false;
        }
        for (const entitlement of entitlements) {
            if (
                EntitlementUtil.permissions.some(
                    permission => permission === entitlement
                )
            ) {
                return true;
            }
        }
        return false;
    }

    static updatePermissions(
        permissions: string[],
        updateOption: 'add' | 'remove' = 'add'
    ): void {
        if (!permissions || permissions.length) {
            return;
        }
        if (updateOption === 'add') {
            permissions.forEach(permission => {
                if (
                    !EntitlementUtil.permissions.some(
                        entitlement => entitlement === permission
                    )
                ) {
                    EntitlementUtil.insertToPermissions(permission);
                }
            });
        } else {
            permissions.forEach(permission =>
                EntitlementUtil.removePermission(permission)
            );
        }
    }

    static addPermission(permission: string): void {
        if (!permission) {
            return;
        }
        if (
            !EntitlementUtil.permissions.some(
                entitlement => entitlement === permission
            )
        ) {
            EntitlementUtil.insertToPermissions(permission);
        }
    }

    static removePermission(permission: string): void {
        const index = EntitlementUtil.permissions.indexOf(permission);
        EntitlementUtil.permissions.splice(index, 1);
    }

    static clearPermissions(): void {
        EntitlementUtil.permissions = [];
    }

    private static insertToPermissions(permission: string): void {
        try {
            EntitlementUtil.permissions.push(permission);
        } catch (e) {
            EntitlementUtil.permissions = [
                ...EntitlementUtil.permissions,
                ...[permission]
            ];
        }
    }
}

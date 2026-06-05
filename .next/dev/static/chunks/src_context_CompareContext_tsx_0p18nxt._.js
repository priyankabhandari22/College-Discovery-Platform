(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/context/CompareContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompareProvider",
    ()=>CompareProvider,
    "useCompare",
    ()=>useCompare
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const CompareContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CompareProvider({ children }) {
    _s();
    const [compareIds, setCompareIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Load from local storage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CompareProvider.useEffect": ()=>{
            const saved = localStorage.getItem('edutrack_compare');
            if (saved) {
                try {
                    setCompareIds(JSON.parse(saved));
                } catch (e) {
                    console.error('Failed to load compare state');
                }
            }
        }
    }["CompareProvider.useEffect"], []);
    // Save to local storage on change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CompareProvider.useEffect": ()=>{
            localStorage.setItem('edutrack_compare', JSON.stringify(compareIds));
        }
    }["CompareProvider.useEffect"], [
        compareIds
    ]);
    const addToCompare = (id)=>{
        setCompareIds((prev)=>{
            if (prev.includes(id)) return prev;
            if (prev.length >= 3) {
                // Optionally alert user "Maximum 3 colleges"
                return prev;
            }
            return [
                ...prev,
                id
            ];
        });
    };
    const removeFromCompare = (id)=>{
        setCompareIds((prev)=>prev.filter((i)=>i !== id));
    };
    const isInCompare = (id)=>compareIds.includes(id);
    const clearCompare = ()=>setCompareIds([]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CompareContext.Provider, {
        value: {
            compareIds,
            addToCompare,
            removeFromCompare,
            isInCompare,
            clearCompare
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/CompareContext.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(CompareProvider, "rZX+lJN4QB+A5qXMsj11GkpSXl8=");
_c = CompareProvider;
function useCompare() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CompareContext);
    if (context === undefined) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
}
_s1(useCompare, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CompareProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_context_CompareContext_tsx_0p18nxt._.js.map
window.__ModuleLoader__.load({
  id: "dsh-chat-pdf-export",
  factory: (require) => {
    const React = require("react");
    const ReactDOM = require("react-dom");
    const h = React.createElement;
    const Fragment = React.Fragment;

    const NS = "dsh-chat-pdf-export";
    const HEADER_SLOT = "conversation.session.header.utilities";
    const COPY = {
      trigger: "导出 PDF",
      triggerTitle: "选择对话内容并打印为 PDF",
      title: "打印对话为 PDF",
      subtitle: "只选择当前页面已经加载的助手正文轮次，不导出你发送的消息。思考过程、工具调用、操作按钮和 token 用量会自动排除。",
      currentSession: "当前会话",
      loaded: "已加载",
      turn: "轮",
      turns: "轮",
      selected: "已选",
      rows: "条助手正文",
      selectAll: "全选",
      clear: "清空",
      refresh: "刷新列表",
      refreshTitle: "重新读取当前页面的正文",
      print: "打印 / Save as PDF",
      close: "取消",
      paperMode: "打印样式",
      screenTheme: "跟随界面主题",
      whitePaper: "白纸版",
      screenHint: "只保留助手正文；你发送的消息、思考、工具、状态和 token 信息会自动排除。",
      loadedHint: "仅显示当前已加载且可见的助手正文；更早历史需要先加载。",
      noRows: "没有找到已加载的可见助手正文。请打开一个非空会话，或先加载历史。",
      scopeAmbiguous: "当前页面包含多个已加载会话，无法安全判断当前会话；请只保留一个会话视图后重试。",
      noSelection: "请至少选择一轮对话。",
      printHint: "打印对话框中选择“存储为 PDF”；需要保留颜色时请勾选“背景图形”。",
      kinds: {
        user: "用户正文",
        steering: "引导",
        "assistant-step": "助手正文",
        "turn-tail": "助手结尾",
        "turn-process": "思考",
        "tool-call": "工具",
        command: "命令",
        context: "上下文",
        "system-prompt": "系统",
        "turn-error": "错误",
        "turn-max-tokens": "中止",
        "manual-compaction": "压缩",
        compaction: "压缩",
        "model-retry": "重试",
        unknown: "其他",
      },
    };

    const EN = {
      trigger: "Export PDF",
      triggerTitle: "Select conversation content and print it as a PDF",
      title: "Print conversation as PDF",
      subtitle: "Select loaded assistant-body turns only. Your messages are not exported; thinking, tool calls, controls, and token usage are excluded automatically.",
      currentSession: "Current session",
      loaded: "loaded",
      turn: "turn",
      turns: "turns",
      selected: "selected",
      rows: "assistant-body items",
      selectAll: "Select all",
      clear: "Clear",
      refresh: "Refresh list",
      refreshTitle: "Read the body currently rendered on the page again",
      print: "Print / Save as PDF",
      close: "Cancel",
      paperMode: "Print style",
      screenTheme: "Follow interface theme",
      whitePaper: "White paper",
      screenHint: "Only assistant body is kept; your messages, thinking, tools, status, and token data are excluded.",
      loadedHint: "Only loaded, visible assistant body is listed; load older history first.",
      noRows: "No loaded, visible assistant body was found. Open a non-empty session or load history first.",
      scopeAmbiguous: "Multiple loaded sessions are visible, so the current session cannot be identified safely. Keep one conversation view open and try again.",
      noSelection: "Select at least one conversation turn.",
      printHint: "Choose “Save as PDF” in the print dialog; enable “Background graphics” to keep colors.",
      kinds: {
        user: "User body",
        steering: "Steering",
        "assistant-step": "Assistant body",
        "turn-tail": "Assistant tail",
        "turn-process": "Thinking",
        "tool-call": "Tool",
        command: "Command",
        context: "Context",
        "system-prompt": "System",
        "turn-error": "Error",
        "turn-max-tokens": "Stopped",
        "manual-compaction": "Compaction",
        compaction: "Compaction",
        "model-retry": "Retry",
        unknown: "Other",
      },
    };

    const bodyKinds = new Set(["assistant-step"]);
    const kindOrder = ["user", "assistant-step"];

    const css = [
      ".dshcpf-root{display:inline-flex;position:relative}",
      ".dshcpf-trigger{height:32px;min-width:96px;padding:6px 12px;border:1px solid var(--dsw-alias-border-l2,#d9dde5);border-radius:18px;background:transparent;color:var(--dsw-alias-label-primary,#252a32);font:400 13px/20px var(--dsw-font-family,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif);display:inline-flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;white-space:nowrap}",
      ".dshcpf-trigger:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,139,160,.12))}",
      ".dshcpf-trigger:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4775d1);outline-offset:2px}",
      ".dshcpf-trigger svg{flex:none}",
      ".dshcpf-overlay{position:fixed;z-index:2147483000;inset:0;overflow:auto;background:rgba(15,23,42,.42);display:flex;align-items:flex-start!important;justify-content:center;padding:24px 20px;box-sizing:border-box;overscroll-behavior:contain}",
      ".dshcpf-dialog{width:min(720px,calc(100vw - 40px))!important;max-width:720px!important;max-height:calc(100dvh - 48px);min-height:0;border:1px solid var(--dsw-alias-border-l2,#d9dde5);border-radius:18px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#20252d);box-shadow:0 24px 72px rgba(15,23,42,.28);display:flex;flex-direction:column;overflow:hidden;font-family:var(--dsw-font-family,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif)}",
      ".dshcpf-dialogHeader{padding:22px 24px 16px;border-bottom:1px solid var(--dsw-alias-border-l1,#eceff3);display:flex;align-items:flex-start;gap:14px;flex:none}",
      ".dshcpf-titleBlock{min-width:0;flex:1}",
      ".dshcpf-dialogTitle{margin:0;color:inherit;font-size:18px;font-weight:650;line-height:26px}",
      ".dshcpf-subtitle{margin:6px 0 0;color:var(--dsw-alias-label-secondary,#667085);font-size:13px;line-height:19px}",
      ".dshcpf-closeIcon{width:30px;height:30px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,#667085);font-size:22px;line-height:28px;cursor:pointer;flex:none}",
      ".dshcpf-closeIcon:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,139,160,.12));color:var(--dsw-alias-label-primary,#20252d)}",
      ".dshcpf-toolbar{padding:12px 24px 10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;flex:none}",
      ".dshcpf-toolbarButton{min-height:30px;border:1px solid var(--dsw-alias-border-l2,#d9dde5);border-radius:9px;padding:5px 10px;background:transparent;color:var(--dsw-alias-label-secondary,#667085);font:500 12px/18px var(--dsw-font-family,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif);cursor:pointer}",
      ".dshcpf-toolbarButton:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,139,160,.12));color:var(--dsw-alias-label-primary,#20252d)}",
      ".dshcpf-toolbarButton:focus-visible,.dshcpf-paperSelect:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4775d1);outline-offset:2px}",
      ".dshcpf-count{margin-left:auto;color:var(--dsw-alias-label-secondary,#667085);font-size:12px;line-height:18px;white-space:nowrap}",
      ".dshcpf-paperLabel{display:inline-flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary,#667085);font-size:12px;line-height:18px}",
      ".dshcpf-paperSelect{height:30px;border:1px solid var(--dsw-alias-border-l2,#d9dde5);border-radius:9px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#20252d);padding:4px 8px;font:400 12px/18px var(--dsw-font-family,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif)}",
      ".dshcpf-list{min-height:96px;flex:1 1 auto;max-height:none;overflow:auto;padding:4px 16px 12px;background:var(--dsw-alias-bg-base,#fff);overscroll-behavior:contain}",
      ".dshcpf-group{display:flex;align-items:flex-start;gap:11px;margin:4px 0;padding:12px 10px;border:1px solid var(--dsw-alias-border-l1,#eceff3);border-radius:12px;background:var(--dsw-alias-bg-base,#fff);cursor:pointer}",
      ".dshcpf-group:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,139,160,.08))}",
      ".dshcpf-group:has(input:focus-visible){outline:2px solid var(--dsw-alias-state-business-primary,#4775d1);outline-offset:-2px}",
      ".dshcpf-check{width:17px;height:17px;margin:2px 0 0;accent-color:var(--dsw-alias-state-business-primary,#4775d1);flex:none}",
      ".dshcpf-groupCopy{min-width:0;flex:1}",
      ".dshcpf-groupTop{display:flex;align-items:baseline;gap:8px;min-width:0}",
      ".dshcpf-groupLabel{color:var(--dsw-alias-label-primary,#20252d);font-size:14px;font-weight:600;line-height:20px}",
      ".dshcpf-kindLine{min-width:0;color:var(--dsw-alias-label-tertiary,#8a93a3);font-size:11px;line-height:17px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}",
      ".dshcpf-preview{margin:3px 0 0;color:var(--dsw-alias-label-secondary,#667085);font-size:12px;line-height:18px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:pre-wrap;overflow-wrap:anywhere}",
      ".dshcpf-empty{padding:28px 14px;color:var(--dsw-alias-label-tertiary,#8a93a3);font-size:13px;line-height:20px;text-align:center}",
      ".dshcpf-notice{margin:0 24px 12px;padding:9px 11px;border-radius:9px;background:var(--dsw-alias-interactive-bg-hover,rgba(127,139,160,.08));color:var(--dsw-alias-label-secondary,#667085);font-size:12px;line-height:18px;flex:none}",
      ".dshcpf-error{margin:0 24px 12px;padding:9px 11px;border-radius:9px;background:var(--dsw-alias-state-error-bg,rgba(220,38,38,.08));color:var(--dsw-alias-state-error-primary,#c24141);font-size:12px;line-height:18px;flex:none}",
      ".dshcpf-dialogFooter{padding:14px 24px 18px;border-top:1px solid var(--dsw-alias-border-l1,#eceff3);display:flex;align-items:center;gap:10px;flex:none}",
      ".dshcpf-footerHint{min-width:0;flex:1;color:var(--dsw-alias-label-tertiary,#8a93a3);font-size:11px;line-height:16px}",
      ".dshcpf-footerButton{min-height:34px;border-radius:10px;padding:7px 13px;font:600 13px/20px var(--dsw-font-family,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif);cursor:pointer}",
      ".dshcpf-cancel{border:1px solid var(--dsw-alias-border-l2,#d9dde5);background:transparent;color:var(--dsw-alias-label-secondary,#667085)}",
      ".dshcpf-cancel:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(127,139,160,.12))}",
      ".dshcpf-print{border:1px solid var(--dsw-alias-state-business-primary,#4775d1);background:var(--dsw-alias-state-business-primary,#4775d1);color:#fff}",
      ".dshcpf-print:hover:not(:disabled){filter:brightness(.96)}",
      ".dshcpf-print:disabled{opacity:.45;cursor:not-allowed}",
      ".dshcpf-print-root{display:none}",
      ".dshcpf-print-root[data-paper=light]{--dsw-alias-bg-base:#fff;--dsw-specific-dialog:#fff;--dsw-alias-label-primary:#20252d;--dsw-alias-label-secondary:#4b5563;--dsw-alias-label-tertiary:#6b7280;--dsw-alias-label-caption:#6b7280;--dsw-alias-border-l1:#e5e7eb;--dsw-alias-border-l2:#d1d5db;--dsw-alias-markdown-code-block:#f3f4f6;--dsw-alias-markdown-code-block-banner:#e5e7eb;--dsw-alias-interactive-bg-hover:rgba(15,23,42,.06);background:#fff!important;color:#20252d!important}",
      "@media print{",
      "@page{size:auto;margin:10mm 12mm}",
      "html.dshcpf-printing,html.dshcpf-printing body{background:#fff!important;height:auto!important;min-height:0!important}",
      "html.dshcpf-printing body{display:block!important;position:static!important;width:100%!important;height:auto!important;min-height:0!important;margin:0!important;transform:none!important;color:var(--dsw-alias-label-primary,#20252d)!important}",
      "html.dshcpf-printing body>*:not(.dshcpf-print-root){display:none!important}",
      "html.dshcpf-printing .dshcpf-print-root{display:block!important;box-sizing:border-box;width:100%;min-height:0!important;margin:0!important;padding:0!important;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#20252d);font-family:var(--dsw-font-family,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif);print-color-adjust:exact;-webkit-print-color-adjust:exact}",
      "html.dshcpf-printing .dshcpf-printHeader{padding:0 0 12px;margin:0 0 14px;border-bottom:1px solid var(--dsw-alias-border-l2,#d1d5db);break-after:avoid;page-break-after:avoid}",
      "html.dshcpf-printing .dshcpf-printTitle{margin:0;color:inherit;font-size:18px;line-height:25px;font-weight:650}",
      "html.dshcpf-printing .dshcpf-printMeta{margin:4px 0 0;color:var(--dsw-alias-label-tertiary,#6b7280);font-size:10px;line-height:15px}",
      "html.dshcpf-printing .dshcpf-print-flow{display:block;margin:0!important;padding:0!important}",
       "html.dshcpf-printing .dshcpf-print-flow *{box-sizing:border-box;max-height:none!important;overflow:visible!important;content-visibility:visible!important}",
      "html.dshcpf-printing .dshcpf-print-flow>[data-chat-flow-key]{display:block!important;visibility:visible!important;max-width:100%;min-width:0;break-inside:auto;page-break-inside:auto;overflow:visible!important;margin:0 0 16px}",
      "html.dshcpf-printing .dshcpf-print-flow pre{max-height:none!important;overflow:visible!important;white-space:pre-wrap!important;overflow-wrap:anywhere!important}",
      "html.dshcpf-printing .dshcpf-print-flow a,html.dshcpf-printing .dshcpf-print-flow code{max-width:100%;overflow-wrap:anywhere!important;word-break:break-word!important;white-space:pre-wrap!important;color:var(--dsw-alias-label-primary,#20252d)!important;-webkit-text-fill-color:currentColor!important}",
       "html.dshcpf-printing .dshcpf-print-flow table{width:100%!important;max-width:100%!important;table-layout:auto;break-inside:auto}",
      "html.dshcpf-printing .dshcpf-print-flow img,html.dshcpf-printing .dshcpf-print-flow svg{max-width:100%;}",
      "html.dshcpf-printing .dshcpf-print-flow button,html.dshcpf-printing .dshcpf-print-flow input,html.dshcpf-printing .dshcpf-print-flow textarea,html.dshcpf-printing .dshcpf-print-flow select{display:none!important}",
      "html.dshcpf-printing .dshcpf-print-flow [data-variant=think],html.dshcpf-printing .dshcpf-print-flow [data-turn-process-inline],html.dshcpf-printing .dshcpf-print-flow [data-turn-process-hidden],html.dshcpf-printing .dshcpf-print-flow [data-turn-usage-details]{display:none!important}",
      "}",
      "@media (max-width:620px){.dshcpf-overlay{padding:10px}.dshcpf-dialog{max-height:calc(100dvh - 20px)}.dshcpf-dialogHeader{padding:18px 18px 13px}.dshcpf-toolbar{padding-left:18px;padding-right:18px}.dshcpf-count{margin-left:0}.dshcpf-list{padding-left:8px;padding-right:8px}.dshcpf-notice,.dshcpf-error{margin-left:18px;margin-right:18px}.dshcpf-dialogFooter{padding-left:18px;padding-right:18px;flex-wrap:wrap}.dshcpf-footerHint{flex-basis:100%;order:-1}.dshcpf-footerButton{flex:1}}",
    ].join("");

    const styleTagId = "dsh-chat-pdf-export/styles";
    let activePrintCleanup = null;

    function installStyles() {
      if (typeof document === "undefined") return () => {};
      const selector = `style[data-plugin-css=${JSON.stringify(styleTagId)}]`;
      const existing = document.querySelector(selector);
      if (existing !== null) {
        existing.textContent = css;
        return () => existing.remove();
      }
      const tag = document.createElement("style");
      tag.dataset.plugin = "dsh-chat-pdf-export";
      tag.dataset.pluginCss = styleTagId;
      tag.textContent = css;
      document.head.appendChild(tag);
      return () => tag.remove();
    }

    function tr(t, key) {
      const fallback = key.split(".").reduce((value, part) => value?.[part], COPY);
      if (typeof t !== "function") return fallback ?? key;
      try {
        const value = t(key);
        return typeof value === "string" && value !== key ? value : fallback ?? key;
      } catch {
        return fallback ?? key;
      }
    }

    function kindLabel(kind, t) {
      const value = tr(t, `kinds.${kind}`);
      return value === `kinds.${kind}` ? (COPY.kinds[kind] ?? kind) : value;
    }

    function isBodyRow(row) {
      return bodyKinds.has(row.dataset.chatFlowKind || "");
    }

    function stripNonBodyContent(root) {
      root.querySelectorAll([
        '[data-variant="think"]',
        "[data-turn-process-inline]",
        "[data-turn-process-hidden]",
        "[data-turn-process]",
        "[data-turn-usage-details]",
      ].join(",")).forEach((node) => node.remove());

      const hoverRoots = [];
      if (typeof root.matches === "function" && root.matches("[data-time-hover-root]")) hoverRoots.push(root);
      hoverRoots.push(...root.querySelectorAll("[data-time-hover-root]"));
      hoverRoots.forEach((hoverRoot) => {
        Array.from(hoverRoot.children).slice(1).forEach((node) => node.remove());
        hoverRoot.removeAttribute("data-time-hover-root");
      });

      root.querySelectorAll("button").forEach((button) => {
        if (button.closest("code")) {
          const text = document.createElement("span");
          text.className = button.className;
          text.textContent = button.textContent ?? "";
          button.replaceWith(text);
        } else {
          button.remove();
        }
      });
      root.querySelectorAll("input, textarea, select").forEach((node) => node.remove());
      root.removeAttribute("data-turn-process-hidden");
      root.removeAttribute("data-turn-process-member");
      root.removeAttribute("data-turn-process-answer");
      return root;
    }

    function cloneBodyRow(row) {
      const clone = row.cloneNode(true);
      clone.removeAttribute("data-pending-steering");
      clone.removeAttribute("data-submission-echo");
      return stripNonBodyContent(clone);
    }

    function previewText(row) {
      const body = cloneBodyRow(row);
      const text = (typeof body.innerText === "string" ? body.innerText : body.textContent ?? "")
        .replace(/[\t\r\n ]+/g, " ")
        .trim();
      return text.length > 190 ? `${text.slice(0, 187)}…` : text;
    }

    function rowIsVisible(row) {
      if (row.hidden || row.getAttribute("aria-hidden") === "true") return false;
      const style = typeof getComputedStyle === "function" ? getComputedStyle(row) : null;
      if (style?.display === "none" || style?.visibility === "hidden" || style?.contentVisibility === "hidden") return false;
      const box = typeof row.getBoundingClientRect === "function" ? row.getBoundingClientRect() : null;
      return box === null || box.width > 0 || box.height > 0;
    }

    function conversationScope() {
      const candidates = Array.from(document.querySelectorAll("[data-conversation-scroll]"));
      if (candidates.length === 1) return candidates[0];
      const populated = candidates.filter((candidate) => candidate.querySelector("[data-chat-flow-key]") !== null);
      return populated.length === 1 ? populated[0] : null;
    }

    function conversationScopeIssue() {
      const candidates = Array.from(document.querySelectorAll("[data-conversation-scroll]"));
      const populated = candidates.filter((candidate) => candidate.querySelector("[data-chat-flow-key]") !== null);
      return populated.length > 1 ? "scopeAmbiguous" : null;
    }

    function renderedFlowRows() {
      const scope = conversationScope();
      if (scope === null) return [];
      return Array.from(scope.querySelectorAll("[data-chat-flow-key]")).filter((row) => {
        if (typeof HTMLElement !== "undefined" && !(row instanceof HTMLElement)) return false;
        return isBodyRow(row) && typeof row.dataset.chatFlowKey === "string" && row.dataset.chatFlowKey !== "" && rowIsVisible(row);
      });
    }

    function groupIdFor(row, index) {
      const turn = row.dataset.chatTurn;
      return turn === undefined || turn === "" ? `row:${row.dataset.chatFlowKey ?? index}` : `turn:${turn}`;
    }

    function collectGroups() {
      const groups = new Map();
      renderedFlowRows().forEach((row, index) => {
        const id = groupIdFor(row, index);
        const kind = row.dataset.chatFlowKind || "unknown";
        const turn = row.dataset.chatTurn || "";
        let group = groups.get(id);
        if (group === undefined) {
          group = { id, turn, rowKeys: [], kinds: [], previews: [] };
          groups.set(id, group);
        }
        const key = row.dataset.chatFlowKey;
        if (key !== undefined && !group.rowKeys.includes(key)) group.rowKeys.push(key);
        if (!group.kinds.includes(kind)) group.kinds.push(kind);
        const preview = previewText(row);
        if (preview !== "" && group.previews.length < 2) group.previews.push(preview);
      });
      return [...groups.values()].map((group, index) => ({
        ...group,
        id: group.id || `group:${index}`,
        kinds: group.kinds.sort((left, right) => {
          const a = kindOrder.indexOf(left);
          const b = kindOrder.indexOf(right);
          return (a < 0 ? kindOrder.length : a) - (b < 0 ? kindOrder.length : b);
        }),
        label: group.turn === "" ? "正文" : `第 ${group.turn} 轮`,
        preview: group.previews.join(" · "),
      }));
    }

    function groupsSignature(groups) {
      return groups.map((group) => `${group.id}:${group.rowKeys.join(",")}:${group.kinds.join(",")}:${group.preview}`).join("|");
    }

    function safeTitle(value) {
      const text = String(value ?? "session").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
      return text.slice(0, 70) || "session";
    }

    function copyCustomProperties(source, target) {
      if (typeof getComputedStyle !== "function") return;
      const ancestors = [];
      for (let current = source; current !== null; current = current.parentElement) ancestors.push(current);
      for (let i = ancestors.length - 1; i >= 0; i -= 1) {
        const computed = getComputedStyle(ancestors[i]);
        for (let property = 0; property < computed.length; property += 1) {
          const name = computed.item(property);
          if (name.startsWith("--")) target.style.setProperty(name, computed.getPropertyValue(name));
        }
      }
    }

    function createPrintRoot(selectedIds, paper) {
      const selected = new Set(selectedIds);
      const rows = renderedFlowRows().filter((row) => selected.has(groupIdFor(row, 0)));
      if (rows.length === 0) return null;

      const root = document.createElement("main");
      root.className = "dshcpf-print-root";
      root.dataset.paper = paper === "light" ? "light" : "screen";
      root.dataset.plugin = "dsh-chat-pdf-export";
      if (paper !== "light") copyCustomProperties(rows[0], root);

      const flow = document.createElement("div");
      flow.className = "dshcpf-print-flow";
      for (const row of rows) {
        flow.appendChild(cloneBodyRow(row));
      }
      root.append(flow);
      document.body.appendChild(root);
      return root;
    }

    function cleanupPrint() {
      if (activePrintCleanup !== null) {
        const cleanup = activePrintCleanup;
        activePrintCleanup = null;
        cleanup();
      }
    }

    function printGroups(sessionId, groups, selectedIds, paper, t) {
      cleanupPrint();
      const root = createPrintRoot(selectedIds, paper);
      if (root === null) return false;

      const previousTitle = document.title;
      const printTitle = `dsh-chat-${safeTitle(sessionId)}-${new Date().toISOString().slice(0, 10)}`;
      const onAfterPrint = () => {
        window.removeEventListener("afterprint", onAfterPrint);
        document.documentElement.classList.remove("dshcpf-printing");
        document.body.classList.remove("dshcpf-printing");
        root.remove();
        document.title = previousTitle;
        if (activePrintCleanup !== null) activePrintCleanup = null;
      };
      activePrintCleanup = onAfterPrint;
      window.addEventListener("afterprint", onAfterPrint, { once: true });
      document.documentElement.classList.add("dshcpf-printing");
      document.body.classList.add("dshcpf-printing");
      document.title = printTitle;
      try {
        // Keep this synchronous so the native print dialog remains a user gesture.
        window.print();
      } catch {
        onAfterPrint();
        return false;
      }
      return true;
    }

    function DocumentIcon() {
      return h("svg", {
        viewBox: "0 0 16 16",
        width: 14,
        height: 14,
        "aria-hidden": true,
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.35,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: [
          h("path", { d: "M4 1.75h5l3 3v9.5H4z" }),
          h("path", { d: "M9 1.75v3h3M6 8h4M6 10.5h4" }),
        ],
      });
    }

    function CloseIcon() {
      return h("span", { "aria-hidden": true, children: "×" });
    }

    function ExportDialog({ sessionId, t, onClose }) {
      const [groups, setGroups] = React.useState([]);
      const [selectedIds, setSelectedIds] = React.useState([]);
      const [paper, setPaper] = React.useState("screen");
      const [error, setError] = React.useState(null);
      const signatureRef = React.useRef("");
      const initializedRef = React.useRef(false);

      const refresh = React.useCallback(() => {
        const next = collectGroups();
        const signature = groupsSignature(next);
        if (signature === signatureRef.current) return;
        signatureRef.current = signature;
        setGroups(next);
        setSelectedIds((current) => {
          if (!initializedRef.current) {
            initializedRef.current = true;
            return next.map((group) => group.id);
          }
          const currentSet = new Set(current);
          return next.filter((group) => currentSet.has(group.id)).map((group) => group.id);
        });
      }, []);

      React.useEffect(() => {
        refresh();
        const scroll = document.querySelector("[data-conversation-scroll]");
        const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver(refresh);
        observer?.observe(scroll ?? document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "data-chat-flow-key", "data-chat-flow-kind", "data-chat-turn"] });
        const onKeyDown = (event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
          }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => {
          observer?.disconnect();
          document.removeEventListener("keydown", onKeyDown);
        };
      }, [onClose, refresh]);

      const selectedSet = new Set(selectedIds);
      const selectedGroups = groups.filter((group) => selectedSet.has(group.id));
      const selectedRowCount = selectedGroups.reduce((total, group) => total + group.rowKeys.length, 0);

      const toggle = (id) => {
        setError(null);
        setSelectedIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);
      };
      const selectAll = () => {
        setError(null);
        setSelectedIds(groups.map((group) => group.id));
      };
      const clear = () => {
        setError(null);
        setSelectedIds([]);
      };
      const doPrint = () => {
        if (selectedIds.length === 0) {
          setError(tr(t, "noSelection"));
          return;
        }
        const started = printGroups(sessionId, groups, selectedIds, paper, t);
        if (started) onClose();
        else setError("无法打开系统打印对话框。");
      };

      return h("div", {
        className: "dshcpf-overlay",
        role: "presentation",
        onMouseDown: (event) => {
          if (event.target === event.currentTarget) onClose();
        },
        children: h("section", {
          className: "dshcpf-dialog",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "dshcpf-dialog-title",
          onMouseDown: (event) => event.stopPropagation(),
          children: [
            h("header", {
              className: "dshcpf-dialogHeader",
              children: [
                h("div", {
                  className: "dshcpf-titleBlock",
                  children: [
                    h("h2", { id: "dshcpf-dialog-title", className: "dshcpf-dialogTitle", children: tr(t, "title") }),
                    h("p", { className: "dshcpf-subtitle", children: tr(t, "subtitle") }),
                  ],
                }),
                h("button", {
                  type: "button",
                  className: "dshcpf-closeIcon",
                  "aria-label": tr(t, "close"),
                  title: tr(t, "close"),
                  onClick: onClose,
                  children: h(CloseIcon),
                }),
              ],
            }),
            h("div", {
              className: "dshcpf-toolbar",
              children: [
                h("button", { type: "button", className: "dshcpf-toolbarButton", onClick: selectAll, children: tr(t, "selectAll") }),
                h("button", { type: "button", className: "dshcpf-toolbarButton", onClick: clear, children: tr(t, "clear") }),
                h("button", { type: "button", className: "dshcpf-toolbarButton", onClick: () => { signatureRef.current = ""; refresh(); }, title: tr(t, "refreshTitle"), children: tr(t, "refresh") }),
                h("span", { className: "dshcpf-count", children: `${selectedGroups.length}/${groups.length} ${selectedGroups.length === 1 ? tr(t, "turn") : tr(t, "turns")} · ${selectedRowCount} ${tr(t, "rows")}` }),
                h("label", {
                  className: "dshcpf-paperLabel",
                  children: [
                    h("span", { children: tr(t, "paperMode") }),
                    h("select", {
                      className: "dshcpf-paperSelect",
                      value: paper,
                      onChange: (event) => setPaper(event.target.value),
                      children: [
                        h("option", { value: "screen", children: tr(t, "screenTheme") }),
                        h("option", { value: "light", children: tr(t, "whitePaper") }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            h("div", {
              className: "dshcpf-list",
              "aria-live": "polite",
              children: groups.length === 0
                ? h("div", { className: "dshcpf-empty", children: tr(t, conversationScopeIssue() ?? "noRows") })
                : groups.map((group) => h("label", {
                    className: "dshcpf-group",
                    key: group.id,
                    children: [
                      h("input", {
                        className: "dshcpf-check",
                        type: "checkbox",
                        checked: selectedSet.has(group.id),
                        onChange: () => toggle(group.id),
                        "aria-label": group.label,
                      }),
                      h("div", {
                        className: "dshcpf-groupCopy",
                        children: [
                          h("div", {
                            className: "dshcpf-groupTop",
                            children: [
                              h("span", { className: "dshcpf-groupLabel", children: group.label }),
                              h("span", { className: "dshcpf-kindLine", children: group.kinds.map((kind) => kindLabel(kind, t)).join(" · ") }),
                            ],
                          }),
                          group.preview === "" ? null : h("p", { className: "dshcpf-preview", children: group.preview }),
                        ],
                      }),
                    ],
                  })),
            }),
            h("p", { className: "dshcpf-notice", children: `${tr(t, "loadedHint")} ${tr(t, "screenHint")}` }),
            error === null ? null : h("p", { className: "dshcpf-error", role: "alert", children: error }),
            h("footer", {
              className: "dshcpf-dialogFooter",
              children: [
                h("span", { className: "dshcpf-footerHint", children: tr(t, "printHint") }),
                h("button", { type: "button", className: "dshcpf-footerButton dshcpf-cancel", onClick: onClose, children: tr(t, "close") }),
                h("button", { type: "button", className: "dshcpf-footerButton dshcpf-print", disabled: selectedIds.length === 0, onClick: doPrint, children: tr(t, "print") }),
              ],
            }),
          ],
        }),
      });
    }

    function PdfExportHeaderAction({ sessionId, t }) {
      const [open, setOpen] = React.useState(false);
      const close = React.useCallback(() => setOpen(false), []);
      const openDialog = () => setOpen(true);
      return h(Fragment, null,
        h("button", {
          type: "button",
          className: "dshcpf-trigger",
          "aria-expanded": open,
          "aria-haspopup": "dialog",
          title: tr(t, "triggerTitle"),
          onClick: openDialog,
          children: [h(DocumentIcon), h("span", { children: tr(t, "trigger") })],
        }),
        open ? ReactDOM.createPortal(h(ExportDialog, { sessionId, t, onClose: close }), document.body) : null,
      );
    }

    const inject = ["slots", "locale"];

    function apply(ctx) {
      ctx.effect(() => installStyles(), "dsh-chat-pdf-export: styles");
      ctx.effect(() => ctx.locale.register(NS, { zh: COPY, en: EN }), "dsh-chat-pdf-export: dictionaries");
      ctx.inject(["slots"], (scope) => {
        scope.slots.inject(HEADER_SLOT, () => scope.slots.register({
          name: HEADER_SLOT,
          id: "dsh-chat-pdf-export",
          locale: NS,
          order: 30,
          inject: () => ({}),
        }, PdfExportHeaderAction));
      });
      ctx.effect(() => () => cleanupPrint(), "dsh-chat-pdf-export: print cleanup");
    }

    return { apply, inject };
  },
});

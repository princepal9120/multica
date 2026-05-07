import { beforeEach, describe, expect, it } from "vitest";
import { useRecentIssuesStore } from "./recent-issues-store";

describe("useRecentIssuesStore", () => {
  beforeEach(() => {
    useRecentIssuesStore.setState({ items: [] });
  });

  it("removes a stale issue while preserving the rest of recent history", () => {
    const { recordVisit, removeItem } = useRecentIssuesStore.getState();

    recordVisit("issue-1");
    recordVisit("issue-2");
    removeItem("issue-1");

    expect(useRecentIssuesStore.getState().items.map((i) => i.id)).toEqual([
      "issue-2",
    ]);
  });

  it("ignores unknown ids", () => {
    const { recordVisit, removeItem } = useRecentIssuesStore.getState();

    recordVisit("issue-1");
    removeItem("missing");

    expect(useRecentIssuesStore.getState().items).toHaveLength(1);
    expect(useRecentIssuesStore.getState().items[0]?.id).toBe("issue-1");
  });
});

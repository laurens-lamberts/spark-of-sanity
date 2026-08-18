import { describe, it, expect } from "vitest";
import { videos } from "./videos";

describe("videos data", () => {
  it("has videos", () => {
    expect(videos.length).toBeGreaterThan(10);
  });

  it("each video has id, valid youtubeId, and non-empty title", () => {
    for (const video of videos) {
      expect(video).toHaveProperty("id");
      expect(video.youtubeId).toMatch(/^[a-zA-Z0-9_-]{11}$/);
      expect(video.title.length).toBeGreaterThan(0);
    }
  });
});

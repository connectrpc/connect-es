describe("docker testserver", () => {
  it("is running", async () => {
    const response = await fetch(`https://127.0.0.1:8080/does-not-exist`, {
      method: "GET",
    });
    expect(response.status).toBe(404);
  });
});

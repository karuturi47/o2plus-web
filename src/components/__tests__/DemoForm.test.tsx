import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DemoForm from "../DemoForm";

describe("DemoForm", () => {
  it("renders every configured field with its label", () => {
    render(
      <DemoForm
        fields={[
          { name: "name", label: "Name", placeholder: "Your name" },
          { name: "message", label: "Message", type: "textarea" },
        ]}
        submitLabel="Send Message"
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });

  it("shows the success message and hides the form after submit, without navigating away", async () => {
    const user = userEvent.setup();
    render(
      <DemoForm
        fields={[{ name: "email", label: "Email", type: "email" }]}
        submitLabel="Notify Me"
        successMessage="You're on the list!"
      />
    );

    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.click(screen.getByRole("button", { name: "Notify Me" }));

    expect(screen.getByText("You're on the list!")).toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
  });

  it("falls back to a generic success message when none is provided", async () => {
    const user = userEvent.setup();
    render(<DemoForm fields={[{ name: "code", label: "Coupon code" }]} submitLabel="Apply" />);

    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(screen.getByText(/nothing was actually submitted/i)).toBeInTheDocument();
  });
});

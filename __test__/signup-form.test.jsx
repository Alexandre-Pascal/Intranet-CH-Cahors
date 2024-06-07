import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignupForm } from "@/app/SignUp/form/signup-form";
import { signup } from "@/app/actions/auth";
import { useFormStatus } from "react-dom";

jest.mock("../app/lib/session", () => {
  return {
    login: jest.fn(),
  };
});

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");
  return {
    ...originalModule,
    useFormStatus: jest.fn(),
  };
});

jest.mock("../app/actions/auth", () => {
  return {
    signup: jest.fn(),
  };
});


describe("SignupForm", () => {
  it("should render the form", () => {
    useFormStatus.mockReturnValue({ pending: false });
    render(<SignupForm />);
    expect(screen.getByText("Inscrivez-vous")).toBeInTheDocument();
  });

  it("should submit the form", async() => {
    useFormStatus.mockReturnValue({ pending: false });
    signup.mockResolvedValue({ message: "Inscription réussie" });
    render(<SignupForm />);
    fireEvent.change(screen.getByPlaceholderText("Prénom"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: " john@gmail.com" } });
    fireEvent.change(screen.getByPlaceholderText("Mot de passe"), { target: { value: "JohnLePilote12" } });
    fireEvent.submit(screen.getByRole("button"));
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Inscription réussie');
    });
    }
  );
});
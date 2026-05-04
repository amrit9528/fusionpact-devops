import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact us for any questions or feedback",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

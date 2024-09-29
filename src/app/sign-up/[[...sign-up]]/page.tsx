import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex justify-center py-24">
      <SignUp forceRedirectUrl="/profile" />
    </div>
  );
};
export default page;

// Logo.tsx
interface LogoProps {
  size: number;
}

function Logo({ size }: LogoProps) {
  return (
    <>
      <img style={{ width: `${size}px` }} src="/aora.svg" alt="Logo" />
    </>
  );
}

export default Logo;

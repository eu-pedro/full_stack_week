import Image from "next/image";

export function Footer () {
  return (
    <div className="bg-walterWhite p-5 flex flex-col justify-center items-center">
      <Image src='/logo.svg' width={133} height={23} alt="fullstack week" />
      <p className="text-sm font-medium mt-1 text-primaryDarker">Todos os direitos reservados.</p>
    </div>
  )
}
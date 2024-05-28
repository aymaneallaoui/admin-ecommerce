import { H2, Paragraph } from "./Typography";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <H2>{title}</H2>
      <Paragraph className="mt-0 ">{description}</Paragraph>
    </div>
  );
};

export default Heading;

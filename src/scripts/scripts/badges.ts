import fse from 'fs-extra';
import { z } from 'zod';
import path from 'path';


const validBadges = ['npmWD'];
// Add comment link to the available badges guide / badges script guide.
// Can't call it interface, as it's a reserved word.
const interfaceFun = z.function()
  .args(z.array(z.string().refine(v => validBadges.includes(v), {
    message: `Invalid badge identifier. It must be one of those: ${validBadges}`,
  }))) // includes entered value?
  .returns(z.promise(z.string()))
  .implement(async (badges) => {
    // filenames in docs generated by typedoc are in lowercase.
    const filePath = path.join(process.cwd(), 'docs', 'interfaces', interfaceName.toLowerCase());
    const fileContent = (await fse.readFile(filePath)).toString();
    return convertMdToMdTable(fileContent);
  });

const typedocMd = {
  interface: interfaceFun,
};

export default typedocMd;
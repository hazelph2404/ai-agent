import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { toPng } from "@dicebear/converter";
interface Props{
  seed: string,
  variant:string
}
export const generateAvatarUri = async ({ seed, variant }: Props) => {
  let avatar;
  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  } else {
    avatar = createAvatar(initials, { seed, size: 128 });
  }
  const dataUri = await toPng(avatar).toDataUri();
  return dataUri;
};
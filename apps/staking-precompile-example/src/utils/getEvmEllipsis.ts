// Returns a shortened version of a hex address.
export const getHexEllipsis = (hexAddress: string) => {
  const accountEllipsis = hexAddress
    ? `${hexAddress.substring(0, 4)}...${hexAddress.substring(
      hexAddress.length - 4
    )}`
    : null;
  return accountEllipsis;
};

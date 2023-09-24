const useContainsId = () => {
  const containsId = (data: any[], id: string): any | undefined => {
    return data.find((obj) => {
      return obj._id === id;
    });
  };

  return containsId;
};

export default useContainsId;

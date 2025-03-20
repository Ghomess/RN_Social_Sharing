export const fetchDogPhotos = async (): Promise<string> => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  const data = await response.json();
  const url = data.message;
  const imageResponse = await fetch(url);
  const blob = await imageResponse.blob();
  const reader = new FileReader();
  const base64Image = await new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      const base64Image = `data:image/png;base64,${
        reader?.result?.toString().split(',')[1]
      }`;
      resolve(base64Image);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  return base64Image;
};

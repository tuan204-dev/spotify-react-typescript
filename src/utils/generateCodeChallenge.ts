// const generateCodeChallenge = async (codeVerifier: string) => {
//   function base64encode(array: number[]) {
//     return btoa(String.fromCharCode.apply(null, new Uint8Array(array)))
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_')
//       .replace(/=+$/, '');
//   }

//   const encoder = new TextEncoder();
//   const data = encoder.encode(codeVerifier);
//   const digest = await window.crypto.subtle.digest('SHA-256', data);

//   // Convert Uint8Array to an array of numbers using Array.from
//   const digestArray = Array.from(new Uint8Array(digest), (byte) => byte);

//   return base64encode(digestArray);
// };

// export default generateCodeChallenge
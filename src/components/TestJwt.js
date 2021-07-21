import React from "react";
import { useJwt } from "react-jwt";
const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJyb29raWVzIjoiYmF0Y2gyIiwic3ViIjoiYWRtaW4iLCJ0cmFpbmVlcyI6IlR1eWVuIiwib3JnIjoibmFzaHRlY2giLCJleHAiOjE2MjY3MDU0NDQsImlhdCI6MTYyNjcwNTE0NH0.TeMEAYFnB5Qg1RgmMIrtkXtMVABoXf7Xisa5svA9Xwny95ykh4QyXaiwhxHeIQbw2n3Ge0-ZMhKCvyBbfi9ghg";
const TestJwt = () => {
  const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);
  console.log(decodedToken.trainees, isExpired);
  //   const newToken =
  //     "eyJhbGciOiJIUzUxMiJ9.eyJyb29raWVzIjoiYmF0Y2gyIiwic3ViIjoiYWJjZCIsInRyYWluZWVzIjoiVHV5ZW4iLCJvcmciOiJuYXNodGVjaCIsImV4cCI6MTYyNTkyOTU4NSwiaWF0IjoxNjI1OTI5Mjg1fQ.nWb4NxRAm2N4VHJ2Wb7juWfog3xMMcHR-mqsqJuHT6av1aw1tiAobRhGVZUJemaVivyLY9hg6kbaUC7L-4-SKA";
  //   reEvaluateToken(newToken);

  return <div>...</div>;
};
export default TestJwt;

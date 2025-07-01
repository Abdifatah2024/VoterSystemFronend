// import React, { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import * as XLSX from "xlsx";
// import type { AppDispatch } from "../../Redux/store";
// import { uploadVotersExcel } from "../../Redux/VoterSlice/voterUploadSlice";
// import {
//   FiUpload,
//   FiCheck,
//   FiFile,
//   FiDownload,
//   FiAlertCircle,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import styled from "styled-components";
// import type { Voter } from "../../types/Voter";

// // Styled components
// const Container = styled.div``;
// const Title = styled.h2``;
// const UploadBox = styled(motion.div)``;
// const FileInput = styled.input`
//   display: none;
// `;
// const UploadLabel = styled.label``;
// const UploadIcon = styled(FiUpload)``;
// const PreviewContainer = styled(motion.div)``;
// const Table = styled.table``;
// const Th = styled.th``;
// const Td = styled.td``;
// const ActionButton = styled(motion.button)``;
// const SubmitButton = styled(ActionButton)``;
// const DownloadButton = styled(ActionButton)``;
// const Message = styled(motion.div)``;
// const ErrorMessage = styled(Message)`
//   background: #fee2e2;
//   color: #b91c1c;
// `;
// const SuccessMessage = styled(Message)`
//   background: #dcfce7;
//   color: #166534;
// `;
// const FileInfo = styled.div``;
// const Spinner = styled.div``;
// const RequiredFieldIndicator = styled.span`
//   color: #ef4444;
//   margin-left: 2px;
// `;

// const UploadVoters = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const [votersData, setVotersData] = useState<Voter[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const handleFileChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (!file) return;

//       if (file.size > 5 * 1024 * 1024) {
//         setError("File size exceeds 5MB limit");
//         return;
//       }

//       setFile(file);
//       setError(null);
//       setSuccess(false);

//       const reader = new FileReader();
//       reader.onload = (evt) => {
//         try {
//           const bstr = evt.target?.result;
//           const wb = XLSX.read(bstr, { type: "binary" });
//           const ws = wb.Sheets[wb.SheetNames[0]];
//           const data = XLSX.utils.sheet_to_json<any>(ws);

//           if (data.length === 0) {
//             setError("The file is empty");
//             return;
//           }

//           const requiredFields = [
//             "fullName",
//             "gender",
//             "Age",
//             "phoneNumber",
//             "city",
//             "district",
//             "address",
//             "clanTitle",
//             "clanSubtitle",
//           ];
//           const missingFields = requiredFields.filter(
//             (field) => !data[0][field]
//           );

//           if (missingFields.length > 0) {
//             setError(`Missing required columns: ${missingFields.join(", ")}`);
//             return;
//           }

//           // Convert Age to dateOfBirth
//           const transformed = data.map((voter: any) => {
//             const now = new Date();
//             const birthYear = now.getFullYear() - parseInt(voter.Age, 10);
//             const dateOfBirth = new Date(birthYear, 0, 1)
//               .toISOString()
//               .split("T")[0];
//             return {
//               ...voter,
//               dateOfBirth,
//             };
//           });

//           setVotersData(transformed);
//         } catch {
//           setError("Invalid file format. Please upload a valid Excel file.");
//         }
//       };
//       reader.onerror = () =>
//         setError("Error reading file. Please try again.");
//       reader.readAsBinaryString(file);
//     },
//     []
//   );

//   const handleSubmit = useCallback(async () => {
//     if (!votersData.length || !file) return;
//     setIsLoading(true);
//     setError(null);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       await dispatch(uploadVotersExcel(formData)).unwrap();

//       setSuccess(true);
//       setVotersData([]);
//       setFile(null);
//     } catch (err) {
//       if (err instanceof Error) setError(err.message);
//       else setError("Upload failed. Please check the file and try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [dispatch, file, votersData]);

//   const handleDownloadTemplate = useCallback(() => {
//     const sample = [
//       {
//         fullName: "Ali Ahmed",
//         gender: "Male",
//         Age: "40",
//         phoneNumber: "612345678",
//         city: "Hargeisa",
//         district: "26 June",
//         address: "Hargeisa, 26 June",
//         hasVoterId: true,
//         registeredPlace: "Polling Station A",
//         wantsToChangeRegistration: false,
//         newRegistrationPlace: "",
//         desiredRegistrationPlace: "",
//         clanTitle: "Baho-Muuse",
//         clanSubtitle: "Cali Cabdi",
//       },
//     ];

//     const instructions = [
//       ["Field", "Description", "Required"],
//       ["fullName", "Voter's full name", "Yes"],
//       ["gender", "Male / Female", "Yes"],
//       ["Age", "Age in years (e.g., 40)", "Yes"],
//       ["phoneNumber", "Phone number", "Yes"],
//       ["city", "City name", "Yes"],
//       ["district", "District name", "Yes"],
//       ["address", "Address", "Yes"],
//       ["hasVoterId", "true / false", "No"],
//       ["registeredPlace", "Registered place", "No"],
//       ["wantsToChangeRegistration", "true / false", "No"],
//       ["newRegistrationPlace", "New place", "No"],
//       ["desiredRegistrationPlace", "Desired place", "No"],
//       ["clanTitle", "Clan title", "Yes"],
//       ["clanSubtitle", "Clan subtitle", "Yes"],
//     ];

//     const ws = XLSX.utils.json_to_sheet(sample);
//     const instructionWs = XLSX.utils.aoa_to_sheet(instructions);

//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Voters");
//     XLSX.utils.book_append_sheet(wb, instructionWs, "Instructions");

//     XLSX.writeFile(wb, "Voter_Upload_Template.xlsx");
//   }, []);

//   return (
//     <Container>
//       <Title>Voter Bulk Upload</Title>

//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <p className="text-gray-600 text-sm sm:text-base">
//           Upload an Excel file to register multiple voters
//         </p>
//         <DownloadButton onClick={handleDownloadTemplate}>
//           <FiDownload /> Download Template
//         </DownloadButton>
//       </div>

//       <UploadBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//         <FileInput
//           id="file-upload"
//           type="file"
//           accept=".xlsx, .xls, .csv"
//           onChange={handleFileChange}
//         />
//         <UploadLabel htmlFor="file-upload">
//           <UploadIcon />
//           <div>
//             <p style={{ fontWeight: 600, color: "#6366f1" }}>
//               Drag & drop or click to upload Excel
//             </p>
//             <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
//               Max file size: 5MB
//             </p>
//           </div>
//         </UploadLabel>
//       </UploadBox>

//       {file && (
//         <FileInfo>
//           <FiFile />
//           <span>{file.name}</span>
//           <span className="text-gray-500 ml-2">
//             ({(file.size / 1024).toFixed(1)} KB)
//           </span>
//         </FileInfo>
//       )}

//       {error && (
//         <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <FiAlertCircle /> {error}
//         </ErrorMessage>
//       )}

//       {success && (
//         <SuccessMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <FiCheck /> Uploaded successfully!
//         </SuccessMessage>
//       )}

//       {votersData.length > 0 && (
//         <>
//           <PreviewContainer>
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="text-base font-medium text-gray-900">
//                 Preview ({votersData.length} voters)
//               </h3>
//               <p className="text-xs text-gray-500">Showing first 5 records</p>
//             </div>
//             <Table>
//               <thead>
//                 <tr>
//                   <Th>Full Name</Th>
//                   <Th>Gender</Th>
//                   <Th>Date of Birth</Th>
//                   <Th>Phone</Th>
//                   <Th>City</Th>
//                   <Th>District</Th>
//                   <Th>Address</Th>
//                   <Th>Clan Title</Th>
//                   <Th>Clan Subtitle</Th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {votersData.slice(0, 5).map((voter, index) => (
//                   <tr key={index}>
//                     <Td>{voter.fullName}</Td>
//                     <Td>{voter.gender}</Td>
//                     <Td>{voter.dateOfBirth}</Td>
//                     <Td>{voter.phoneNumber}</Td>
//                     <Td>{voter.city}</Td>
//                     <Td>{voter.district}</Td>
//                     <Td>{voter.address}</Td>
//                     <Td>{voter.clanTitle}</Td>
//                     <Td>{voter.clanSubtitle}</Td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </PreviewContainer>

//           <div className="mt-6 flex justify-end">
//             <SubmitButton
//               onClick={handleSubmit}
//               disabled={isLoading}
//               whileHover={!isLoading ? { scale: 1.05 } : {}}
//               whileTap={!isLoading ? { scale: 0.95 } : {}}
//             >
//               {isLoading ? (
//                 <>
//                   <Spinner /> Uploading...
//                 </>
//               ) : (
//                 <>
//                   <FiUpload /> Upload Voters
//                 </>
//               )}
//             </SubmitButton>
//           </div>
//         </>
//       )}
//     </Container>
//   );
// };

// export default UploadVoters;

import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import type { AppDispatch } from "../../Redux/store";
import { uploadVotersExcel } from "../../Redux/VoterSlice/voterUploadSlice";
import {
  FiUpload,
  FiCheck,
  FiFile,
  FiDownload,
  FiAlertCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import styled from "styled-components";
import type { Voter } from "../../types/Voter";

// Styled components
const Container = styled.div``;
const Title = styled.h2``;
const UploadBox = styled(motion.div)``;
const FileInput = styled.input`
  display: none;
`;
const UploadLabel = styled.label``;
const UploadIcon = styled(FiUpload)``;
const PreviewContainer = styled(motion.div)``;
const Table = styled.table``;
const Th = styled.th``;
const Td = styled.td``;
const ActionButton = styled(motion.button)``;
const SubmitButton = styled(ActionButton)``;
const DownloadButton = styled(ActionButton)``;
const Message = styled(motion.div)``;
const ErrorMessage = styled(Message)`
  background: #fee2e2;
  color: #b91c1c;
`;
const SuccessMessage = styled(Message)`
  background: #dcfce7;
  color: #166534;
`;
const FileInfo = styled.div``;
const Spinner = styled.div``;
const RequiredFieldIndicator = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

const UploadVoters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [votersData, setVotersData] = useState<Voter[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      setFile(file);
      setError(null);
      setSuccess(false);

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json<any>(ws);

          if (data.length === 0) {
            setError("The file is empty");
            return;
          }

          const requiredFields = [
            "fullName",
            "gender",
            "Age",
            "phoneNumber",
            "city",
            "district",
            "address",
            "clanTitle",
            "clanSubtitle",
          ];
          const missingFields = requiredFields.filter(
            (field) => !data[0][field]
          );

          if (missingFields.length > 0) {
            setError(`Missing required columns: ${missingFields.join(", ")}`);
            return;
          }

          const transformed = data.map((voter: any) => {
            const now = new Date();
            const birthYear = now.getFullYear() - parseInt(voter.Age, 10);
            const dateOfBirth = new Date(birthYear, 0, 1)
              .toISOString()
              .split("T")[0];
            return {
              ...voter,
              dateOfBirth,
            };
          });

          setVotersData(transformed);
        } catch {
          setError("Invalid file format. Please upload a valid Excel file.");
        }
      };
      reader.onerror = () =>
        setError("Error reading file. Please try again.");
      reader.readAsBinaryString(file);
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    if (!votersData.length || !file) return;
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await dispatch(uploadVotersExcel(formData)).unwrap();

      setSuccess(true);
      setVotersData([]);
      setFile(null);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Upload failed. Please check the file and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, file, votersData]);

  const handleDownloadTemplate = useCallback(() => {
    const sample = [
      {
        fullName: "Ali Ahmed",
        gender: "Male",
        Age: "40",
        phoneNumber: "612345678",
        city: "Hargeisa",
        district: "26 June",
        address: "Hargeisa, 26 June",
        hasVoterId: true,
        registeredPlace: "Polling Station A",
        wantsToChangeRegistration: false,
        newRegistrationPlace: "",
        desiredRegistrationPlace: "",
        clanTitle: "Baho-Muuse",
        clanSubtitle: "Cali Cabdi",
      },
    ];

    const instructions = [
      ["Field", "Description", "Required"],
      ["fullName", "Voter's full name", "Yes"],
      ["gender", "Male / Female", "Yes"],
      ["Age", "Age in years (e.g., 40)", "Yes"],
      ["phoneNumber", "Phone number", "Yes"],
      ["city", "City name", "Yes"],
      ["district", "District name", "Yes"],
      ["address", "Address", "Yes"],
      ["hasVoterId", "true / false", "No"],
      ["registeredPlace", "Registered place", "No"],
      ["wantsToChangeRegistration", "true / false", "No"],
      ["newRegistrationPlace", "New place", "No"],
      ["desiredRegistrationPlace", "Desired place", "No"],
      ["clanTitle", "Clan title", "Yes"],
      ["clanSubtitle", "Clan subtitle", "Yes"],
    ];

    const clans = [
      {
        title: "Baho-Muuse",
        subclans: ["Cali Cabdi", "Nuur Cabdi", "Maxamuud Muuse"],
      },
      {
        title: "Baho-Jibriil",
        subclans: ["Gubadle+Siyaad", "Cali Axmed", "Baho Axmed", "Aadan+Kaliil"],
      },
      {
        title: "Baho-Isxaaq",
        subclans: ["Ciye", "Galab", "Biniin"],
      },
    ];

    const cities = [
      {
        name: "Hargeisa",
        districts: [
          "Axmed Dhagax",
          "Maxamuud Haybe",
          "Maxamed Mooge",
          "26 June",
          "Ibraahim Koodbuur",
          "Gacan Libaax",
          "Macallin Haaruun",
          "New Hargeysa",
        ],
      },
      {
        name: "Salaxley",
        districts: [
          "Ina guuxaa",
          "Kaam-tuug",
          "Dhimbilriyaale",
          "Qoolcadey",
          "Bali-case",
          "Jabaase",
          "Toon",
          "Galoole",
          "Hunduli",
          "Duudku",
        ],
      },
    ];

    const ws = XLSX.utils.json_to_sheet(sample);
    const instructionWs = XLSX.utils.aoa_to_sheet(instructions);

    const clansData = [["Clan Title", "Clan Subtitle"]];
    clans.forEach((clan) => {
      clan.subclans.forEach((sub) => {
        clansData.push([clan.title, sub]);
      });
    });
    const clansWs = XLSX.utils.aoa_to_sheet(clansData);

    const citiesData = [["City", "District"]];
    cities.forEach((city) => {
      city.districts.forEach((district) => {
        citiesData.push([city.name, district]);
      });
    });
    const citiesWs = XLSX.utils.aoa_to_sheet(citiesData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Voters");
    XLSX.utils.book_append_sheet(wb, instructionWs, "Instructions");
    XLSX.utils.book_append_sheet(wb, clansWs, "Clans");
    XLSX.utils.book_append_sheet(wb, citiesWs, "Cities");

    XLSX.writeFile(wb, "Voter_Upload_Template.xlsx");
  }, []);

  return (
    <Container>
      <Title>Voter Bulk Upload</Title>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="text-gray-600 text-sm sm:text-base">
          Upload an Excel file to register multiple voters
        </p>
        <DownloadButton onClick={handleDownloadTemplate}>
          <FiDownload /> Download Template
        </DownloadButton>
      </div>

      <UploadBox whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <FileInput
          id="file-upload"
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileChange}
        />
        <UploadLabel htmlFor="file-upload">
          <UploadIcon />
          <div>
            <p style={{ fontWeight: 600, color: "#6366f1" }}>
              Drag & drop or click to upload Excel
            </p>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Max file size: 5MB
            </p>
          </div>
        </UploadLabel>
      </UploadBox>

      {file && (
        <FileInfo>
          <FiFile />
          <span>{file.name}</span>
          <span className="text-gray-500 ml-2">
            ({(file.size / 1024).toFixed(1)} KB)
          </span>
        </FileInfo>
      )}

      {error && (
        <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FiAlertCircle /> {error}
        </ErrorMessage>
      )}

      {success && (
        <SuccessMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FiCheck /> Uploaded successfully!
        </SuccessMessage>
      )}

      {votersData.length > 0 && (
        <>
          <PreviewContainer>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium text-gray-900">
                Preview ({votersData.length} voters)
              </h3>
              <p className="text-xs text-gray-500">Showing first 5 records</p>
            </div>
            <Table>
              <thead>
                <tr>
                  <Th>Full Name</Th>
                  <Th>Gender</Th>
                  <Th>Date of Birth</Th>
                  <Th>Phone</Th>
                  <Th>City</Th>
                  <Th>District</Th>
                  <Th>Address</Th>
                  <Th>Clan Title</Th>
                  <Th>Clan Subtitle</Th>
                </tr>
              </thead>
              <tbody>
                {votersData.slice(0, 5).map((voter, index) => (
                  <tr key={index}>
                    <Td>{voter.fullName}</Td>
                    <Td>{voter.gender}</Td>
                    <Td>{voter.dateOfBirth}</Td>
                    <Td>{voter.phoneNumber}</Td>
                    <Td>{voter.city}</Td>
                    <Td>{voter.district}</Td>
                    <Td>{voter.address}</Td>
                    <Td>{voter.clanTitle}</Td>
                    <Td>{voter.clanSubtitle}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PreviewContainer>

          <div className="mt-6 flex justify-end">
            <SubmitButton
              onClick={handleSubmit}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <>
                  <Spinner /> Uploading...
                </>
              ) : (
                <>
                  <FiUpload /> Upload Voters
                </>
              )}
            </SubmitButton>
          </div>
        </>
      )}
    </Container>
  );
};

export default UploadVoters;


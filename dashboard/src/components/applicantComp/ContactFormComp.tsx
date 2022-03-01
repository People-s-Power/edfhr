import { useMutation } from "@apollo/client";
import { UPLOAD_FORM } from "apollo/queries/applicantQuery";
import { ApplicantAtom } from "atoms/ApplicantsAtom";
import React, { useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IApplicant } from "types/Applicant.types";

const ContactFormComp = ({ applicant }: { applicant: Partial<IApplicant> }): JSX.Element => {
  const [upload, { loading }] = useMutation(UPLOAD_FORM);
  const setApplicant = useSetRecoilState(ApplicantAtom);

  const uploadRef = useRef<HTMLInputElement>(null);

  const uploadContactForm = async (contact_form: string) => {
    try {
      const { data } = await upload({ variables: { input: { applicant_id: applicant?.id, contact_form } } });
      //   setContact_form(data?.uploadForm?.contact_form);
      setApplicant((old) => {
        return { ...old, contact_form: data?.uploadForm?.contact_form };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const reader = new FileReader();

    if (files && files?.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        uploadContactForm(reader.result as any);
      };
    }
  };

  if (loading) return <p>Processing....</p>;
  return (
    <Wrapper>
      <button onClick={() => uploadRef.current?.click()} className="btn btn-primary mb-3">
        {applicant?.contact_form ? "Change contact form" : "Upload contact form"}
      </button>
      <img src={applicant?.contact_form} loading="lazy" alt="" className="img-flud" />
      <input type="file" ref={uploadRef} hidden={true} onChange={handleFileChange} />
    </Wrapper>
  );
};

export default ContactFormComp;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

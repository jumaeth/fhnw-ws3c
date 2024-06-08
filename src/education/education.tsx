import { useState } from "react";
import { Education } from "@/types/types.ts";
import Button from "@/components/button.tsx";
import { Icons } from "@/components/icons.tsx";
import Modal from "@/components/modal.tsx";
import SingleInputForm from "@/components/single-input-form.tsx";
import { Card } from "@/components/card";

export default function EducationPage() {
  if (!localStorage.educations) {
    localStorage.educations = JSON.stringify([]);
  }
  const [educations, setEducations] = useState<Education[]>(JSON.parse(localStorage.educations))
  const [showModal, setShowModal] = useState(false);

  function addEducation(name: string) {
    const educations = JSON.parse(localStorage.educations) || [];
    if (educations.find((education: Education) => education.name === name)) {
      console.error("Education already exists");
      return;
    }
    const newEducation = { name, semesters: [] };
    educations.push(newEducation);
    setEducations(educations)
    localStorage.educations = JSON.stringify(educations);
  }

  function deleteEducation(input: Education) {
    const educations = JSON.parse(localStorage.educations) || [];
    const updatedEducation = educations.filter((education: Education) => education.name !== input.name);
    setEducations(updatedEducation);
    localStorage.educations = JSON.stringify(updatedEducation);
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 mb-2 mt-4">
        {educations.map((education, index) => (
          <div key={index} className="flex gap-4">
            <Card
              url={`/education/${education.name}`}
              toDelete={() => deleteEducation(education)}
            >
              <p>{education.name}</p>
              <Icons.arrowRight color="#6b7280" className="w-5 h-5" />

            </Card>
          </div>
        ))}
        <Button
          onClick={() => setShowModal(true)}
          icon={<Icons.plus color="#6b7280" className="w-4 h-4" />}
        />
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center w-80 bg-gray-50">
          <div className="mx-auto my-4 w-64">
            <h3 className="text-lg font-black text-gray-800 mb-6">Neue Ausbildung</h3>
            <SingleInputForm inputLabelName="Ausbildung" placeholder="Studium Hochschule" setShowModal={setShowModal}
              onSave={text => addEducation(text)} />
          </div>
        </div>
      </Modal>
    </>
  )
}
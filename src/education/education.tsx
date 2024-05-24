import {useState} from "react";
import {Education} from "@/types/types.ts";
import {useDeleteButton} from "@/hooks/delete-button-provider.tsx";
import {Link} from "react-router-dom";
import Card from "@/components/card.tsx";
import Button from "@/components/button.tsx";
import {Icons} from "@/components/icons.tsx";
import Modal from "@/components/modal.tsx";
import SingleInputForm from "@/components/single-input-form.tsx";

export default function EducationPage() {
  if (!localStorage.educations) {
    localStorage.educations = JSON.stringify([]);
  }
  const [educations, setEducations] = useState<Education[]>(JSON.parse(localStorage.educations))
  const [showModal, setShowModal] = useState(false);
  const {showDeleteButtons} = useDeleteButton();

  function addEducation(name: string) {
    const educations = JSON.parse(localStorage.educations) || [];
    if (educations.find((education: Education) => education.name === name)) {
      console.error("Education already exists");
      return;
    }
    const newEducation = {name, semesters: []};
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
          <div key={index} className="gap-4">
            <Link to={`/education/${education.name}`}>
              <Card
                className="bg-blue-500 text-white"
                left={education.name}
                right={<Icons.arrowRight className="w-4 h-4"/>}
              />
            </Link>
            {showDeleteButtons && (
              <Button
                onClick={() => deleteEducation(education)}
                icon={<Icons.trash className="w-4 h-4"/>}
              />
            )}
          </div>
        ))}
        <Button
          onClick={() => setShowModal(true)}
          icon={<Icons.plus className="w-4 h-4"/>}
        />
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center w-80 bg-gray-50">
          <div className="mx-auto my-4 w-64">
            <h3 className="text-lg font-black text-gray-800 mb-6">Neue Ausbildung</h3>
            <SingleInputForm inputLabelName="Ausbildung" placeholder="Studium Hochschule" setShowModal={setShowModal}
                             onSave={text => addEducation(text)}/>
          </div>
        </div>
      </Modal>
    </>
  )
}
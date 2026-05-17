import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  // Candidate Form State
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: ""
  });


  // All Candidates
  const [candidates, setCandidates] = useState([]);


  // Job Requirement State
  const [job, setJob] = useState({
    requiredSkills: "",
    minExperience: ""
  });


  // Basic Shortlisted Candidates
  const [shortlisted, setShortlisted] = useState([]);


  // AI Result
  const [aiResult, setAiResult] = useState("");


  // Candidate Input Change
  const handleChange = (e) => {

    setCandidate({

      ...candidate,

      [e.target.name]: e.target.value

    });

  };


  // Job Input Change
  const handleJobChange = (e) => {

    setJob({

      ...job,

      [e.target.name]: e.target.value

    });

  };


  // Add Candidate
  const addCandidate = async () => {

    try {

      const response = await axios.post(

        "https://demoback-iqcc.onrender.com",

        {
          ...candidate,

          skills: candidate.skills
            .split(",")
            .map(skill => skill.trim())

        }

      );

      alert("Candidate Added Successfully");

      console.log(response.data);

      getCandidates();

    } catch (error) {

      console.log(error);

    }

  };


  // Get All Candidates
  const getCandidates = async () => {

    try {

      const response = await axios.get(
        "https://demoback-iqcc.onrender.com"
      );

      setCandidates(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  // Basic Shortlisting
  const shortlistCandidates = async () => {

    try {

      const response = await axios.post(

        "https://demoback-iqcc.onrender.com",

        {
          requiredSkills: job.requiredSkills
            .split(",")
            .map(skill => skill.trim()),

          minExperience: Number(job.minExperience)
        }

      );

      setShortlisted(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  // AI Shortlisting
  const aiShortlist = async () => {

    try {

      const response = await axios.post(

        "https://demoback-iqcc.onrender.com",

        {
          requiredSkills: job.requiredSkills
            .split(",")
            .map(skill => skill.trim()),

          minExperience: Number(job.minExperience)
        }

      );

      console.log(response.data);

      setAiResult(
        response.data.choices[0].message.content
      );

    } catch (error) {

      console.log(error);

    }

  };


  // Page Load
  useEffect(() => {

    getCandidates();

  }, []);


  return (

    <div style={{ padding: "20px" }}>

      <h1>
        Candidate Shortlisting System
      </h1>


      {/* Add Candidate Form */}

      <h2>Add Candidate</h2>


      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        onChange={handleChange}
      />

      <br /><br />


      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <br /><br />


      <input
        type="text"
        name="skills"
        placeholder="React, Node.js"
        onChange={handleChange}
      />

      <br /><br />


      <input
        type="number"
        name="experience"
        placeholder="Experience"
        onChange={handleChange}
      />

      <br /><br />


      <textarea
        name="bio"
        placeholder="Enter Bio"
        onChange={handleChange}
      />

      <br /><br />


      <button onClick={addCandidate}>
        Add Candidate
      </button>


      <hr />


      {/* Job Requirement Form */}

      <h2>Shortlist Candidates</h2>


      <input
        type="text"
        name="requiredSkills"
        placeholder="React, Node.js"
        onChange={handleJobChange}
      />

      <br /><br />


      <input
        type="number"
        name="minExperience"
        placeholder="Minimum Experience"
        onChange={handleJobChange}
      />

      <br /><br />


      <button onClick={shortlistCandidates}>
        Shortlist Candidates
      </button>


      <br /><br />


      <button onClick={aiShortlist}>
        AI Shortlist
      </button>


      <hr />


      {/* AI Recommendation */}

      <h2>AI Recommendation</h2>

      <div
        style={{
          border: "2px solid blue",
          padding: "15px",
          marginBottom: "20px",
          whiteSpace: "pre-wrap"
        }}
      >

        {aiResult}

      </div>


      <hr />


      {/* Basic Shortlisted Candidates */}

      <h2>Shortlisted Candidates</h2>

      {
        shortlisted.map((c, index) => (

          <div
            key={index}
            style={{
              border: "2px solid green",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h3>{c.name}</h3>

            <p>Email: {c.email}</p>

            <p>
              Experience:
              {c.experience} years
            </p>

            <p>
              Matched Skills:
              {c.matchedSkills.join(", ")}
            </p>

            <p>
              Match Score:
              {c.matchScore}%
            </p>

          </div>

        ))
      }


      <hr />


      {/* All Candidates */}

      <h2>All Candidates</h2>

      {
        candidates.map((c, index) => (

          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px"
            }}
          >

            <h3>{c.name}</h3>

            <p>Email: {c.email}</p>

            <p>
              Skills:
              {c.skills.join(", ")}
            </p>

            <p>
              Experience:
              {c.experience} years
            </p>

            <p>Bio: {c.bio}</p>

          </div>

        ))
      }

    </div>

  );

}

export default App;
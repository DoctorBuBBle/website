import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { isEmpty } from "lodash";
import { PrimaryButton } from "../components/Button";
import "./contact-page.scss";
import userIcon from "../img/user-icon.svg";
import questionMark from "../img/question-mark.svg";

export const ContactPageTemplate = ({ title }) => {
  const [formData, setFormData] = useState({});
  const refs = {
    email: useRef(),
    subject: useRef(),
    message: useRef(),
  };

  const isInputValid = (inputName) => {
    const input =
      typeof inputName === "string" ? refs[inputName].current : inputName;

    if (isEmpty(input.value)) {
      input.classList.add("is-mandatory");
      return false;
    } else {
      input.classList.remove("is-mandatory");
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      isInputValid("email") &&
      isInputValid("subject") &&
      isInputValid("message")
    ) {
      fetch("/.netlify/functions/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          alert("Your email was sent successfully.");
        } else {
          alert("Your email could not be sent.");
        }
      });
    } else {
      alert("The email, subject and message are mandatory.");
    }
  };

  const onInputChange = (inputName, event) => {
    isInputValid(inputName);
    setFormData({ ...formData, [inputName]: event.target.value });
  };

  return (
    <section className="contact-section">
      <article>
        <h1 className="section-title">{title}</h1>
        <form method="POST" className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <img src={userIcon} alt="email" />
            </label>
            <input
              ref={refs.email}
              type="email"
              placeholder="Email"
              className="form-control"
              aria-describedby="emailHelp"
              value={formData.email}
              onChange={onInputChange.bind(this, "email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">
              <img src={questionMark} alt="subject" />
            </label>
            <input
              ref={refs.subject}
              type="text"
              placeholder="Subject"
              className="form-control"
              value={formData.subject}
              onChange={onInputChange.bind(this, "subject")}
            />
          </div>
          <div className="form-message">
            <textarea
              ref={refs.message}
              placeholder="Message"
              className="form-control"
              rows="5"
              value={formData.message}
              onChange={onInputChange.bind(this, "message")}
            />
          </div>
          <div className="form-submit">
            <PrimaryButton>Submit</PrimaryButton>
          </div>
        </form>
      </article>
    </section>
  );
};

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
};

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ContactPageTemplate title={post.frontmatter.title} />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;

import React, { useState, useEffect } from "react";
import styles from "./ConsentPopup.module.css";

const ConsentPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem("site_consent_accepted");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("site_consent_accepted", "true");
    setShow(false);
  };

  const handleDecline = () => {
    // For now, we just hide it. In a real app, you might disable GA here.
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Terms & Privacy</h3>
        </div>
        <div className={styles.body}>
          <p>
            We use cookies to enhance your experience. By continuing to visit this site, you agree to our Terms of Service and our use of cookies.
          </p>
        </div>
        <div className={styles.actions}>
          <button onClick={handleDecline} className={styles.btnSecondary}>
            Decline
          </button>
          <button onClick={handleAccept} className={styles.btnPrimary}>
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentPopup;

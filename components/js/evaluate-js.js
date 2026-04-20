import { db } from './firebase-config.js';
  import { doc, updateDoc, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  const params = new URLSearchParams(window.location.search);
  const eventId = params.get('event');
  const regId = params.get('reg');

  // Use sessionStorage as fallback
  const finalEventId = eventId || sessionStorage.getItem('ez_event_id');
  const finalRegId = regId || sessionStorage.getItem('ez_reg_id');

  let rating = 0;
  let recommendVal = '';

  window.setRating = function(val) {
    rating = val;
    document.querySelectorAll('.star').forEach((s, i) => {
      s.classList.toggle('active', i < val);
    });
  };

  window.togglePill = function(el) { el.classList.toggle('selected'); };

  window.selectRecommend = function(el, val) {
    document.querySelectorAll('#recommendPills .pill').forEach(p => p.classList.remove('selected'));
    el.classList.add('selected');
    recommendVal = val;
  };

  window.submitEval = async function() {
    if (!rating) { showErr('Please give an overall rating.'); return; }
    const takeaway = document.getElementById('takeaway').value.trim();
    if (!takeaway) { showErr('Please share what you learned from the event.'); return; }

    const likes = [...document.querySelectorAll('#likesPills .pill.selected')].map(p => p.textContent);
    const suggestions = document.getElementById('suggestions').value.trim();

    const btn = document.getElementById('evalBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-spin"></span>Submitting evaluation...';

    try {
      // Save evaluation
      await addDoc(collection(db, 'evaluations', finalEventId, 'responses'), {
        regId: finalRegId,
        rating, likes, takeaway, recommend: recommendVal, suggestions,
        submittedAt: serverTimestamp()
      });

      // Mark registration as evaluation done
      await updateDoc(doc(db, 'registrations', finalEventId, 'responses', finalRegId), {
        evaluationDone: true
      });

      // Go to cert page
      window.location.href = `cert.html?event=${finalEventId}&reg=${finalRegId}`;
    } catch (e) {
      showErr('Submission failed: ' + e.message);
      btn.disabled = false;
      btn.innerHTML = 'Submit & Get My E-Certificate 🎓';
    }
  };

  function showErr(msg) {
    const el = document.getElementById('evalError');
    el.textContent = '⚠️ ' + msg;
    el.style.display = 'block';
  }
import './game-dialog.css';

function Modal({ children }) {
  return (
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>
  );
}

function ModalButton({ onClick, children }) {
  return (
    <button type="button" className="button modal__button" onClick={onClick}>
      {children}
    </button>
  );
}

function GameLostModal({ currentScore, resetGame, exitGame }) {
  return (
    <Modal>
      <div className="modal__title">Game Over!</div>
      <img src="#" alt="#" className="modal__img" />
      <div className="modal__text">Your final score is {currentScore}.</div>
      <div className="modal__actions">
        <ModalButton onClick={resetGame}>Start Over</ModalButton>
        <ModalButton onClick={exitGame}>Quit Game</ModalButton>
      </div>
    </Modal>
  );
}

function GameWonModal({ resetGame, continueGame, currentScore, exitGame }) {
  return (
    <Modal>
      <div className="modal__title">You Win!</div>
      <img src="#" alt="#" className="modal__img" />
      <div className="modal__text">Your final score is {currentScore}.</div>
      <div className="modal__actions">
        <ModalButton onClick={continueGame}>Keep Going</ModalButton>
        <ModalButton onClick={resetGame}>Start Over</ModalButton>
        <ModalButton onClick={exitGame}>Quit Game</ModalButton>
      </div>
    </Modal>
  );
}

function GameCompletedModal({ currentScore, resetGame, exitGame }) {
  return (
    <Modal>
      <div className="modal__title">100% completed!</div>
      <img src="#" alt="#" className="modal__img" />
      <div className="modal__text">
        Your final score is {currentScore}. Congratulations for completing the
        game!
      </div>
      <div className="modal__actions">
        <ModalButton onClick={resetGame}>Start Over</ModalButton>
        <ModalButton onClick={exitGame}>Quit Game</ModalButton>
      </div>
    </Modal>
  );
}

function GameDialog({
  isGameCompleted,
  isGameWon,
  isGameLost,
  currentScore,
  resetGame,
  exitGame,
  continueGame,
}) {
  return (
    <>
      {isGameLost && (
        <GameLostModal {...{ currentScore, resetGame, exitGame }} />
      )}
      {isGameWon && (
        <GameWonModal
          {...{ currentScore, resetGame, continueGame, exitGame }}
        />
      )}
      {isGameCompleted && (
        <GameCompletedModal {...{ currentScore, resetGame, exitGame }} />
      )}
    </>
  );
}

export { GameDialog };

'use client';

import css from './NewModal.module.css'

type Props = {
    children: React.ReactNode,
    onClose: () => void
};

const NewModal = ({ children, onClose }: Props) => {


    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className={css.modalOverlay} onClick={handleBackdropClick}>
            <div className={css.modalContent}>
                {children}
                <button className={css.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default NewModal;
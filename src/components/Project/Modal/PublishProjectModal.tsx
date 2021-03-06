import { FC, Dispatch, SetStateAction, useEffect } from "react";
import Modal from "components/Modal";
import DepositFundsToWallet from "./DepositFundsToWallet";
import useProject from "../Landing/hooks";
import styles from './index.module.scss';
import Spinner from "./Spinner";
import { ReactComponent as CheckIcon } from 'assets/illustrations/icons/check.svg';
import { ReactComponent as SugarIcon } from 'assets/illustrations/icons/sugar.svg';
import { useSelector } from "react-redux";
import { RootState } from "reducers";

interface IPublishProject {
    setOpen: Dispatch<SetStateAction<boolean>>;
    usdcBalance: number,
    projectId: number,
    budget: number,
    projectName: string,
    projectDescription: string
}

const PublishProjectModal: FC<IPublishProject> = ({ setOpen, usdcBalance, projectId, budget, projectName, projectDescription }) => {

    const {
        getGasFeeToPublish,
        publishProject,
        depositFunds,
        deploying,
        gasFee
    } = useProject();

    const { selectedProjectAddress } = useSelector((state: RootState) => state.flProject);

    useEffect(() => {
        getGasFeeToPublish();
    }, []);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal onClose={handleClose}>
            {
                usdcBalance >= budget ? (
                    <>
                        <h1 className={styles['publish-title']}>Publish your project</h1>
                        <div className={styles['publish-content-wrapper']}>
                            {
                                deploying === 'go_live' ? (
                                    <>
                                        <div className={styles['publish-content']}>
                                            <div>
                                                <span>Wallet Amount</span>
                                                <span>${usdcBalance} USDC</span>
                                            </div>
                                            <div>
                                                <span>Gas Fee</span>
                                                <span>$0.01 MATIC</span>
                                            </div>
                                            <div>
                                                <span>Deposit</span>
                                                <span>${budget} USDC</span>
                                            </div>
                                        </div>
                                        <div className={styles['publish-info']}>
                                            <span className={styles['font-size--small']}>*You can always withdraw</span>
                                            <span>Top Up Wallet +</span>
                                        </div>
                                        <button
                                            className={styles['publish-go-live']}
                                            onClick={() => publishProject(projectId, budget, projectName, projectDescription)}
                                        >Go Live</button>
                                    </>
                                ) : deploying === 'deploying' ? (
                                    <div className={styles['publish-deploying-content']}>
                                        <Spinner />
                                        <p>Deploying Contract</p>
                                        <p>Confirm this transaction in your wallet</p>
                                    </div>
                                ) : deploying === 'deploy_success' ? (
                                    <div className={styles['publish-deploying-content']}>
                                        <CheckIcon width={100} height={100} />
                                        <p>This Transaction has been confirmed on mainnet</p>
                                        <p>Your contract id: {selectedProjectAddress.slice(0, 10)}...{selectedProjectAddress.slice(selectedProjectAddress.length - 8, selectedProjectAddress.length)}</p>
                                    </div>
                                ) : deploying === 'deposit' ? (
                                    <>
                                        <div className={styles['publish-content']}>
                                            <div>
                                                <span>Wallet Amount</span>
                                                <span>${usdcBalance} USDC</span>
                                            </div>
                                            <div>
                                                <span>Gas Fee</span>
                                                <span>$0.01 MATIC</span>
                                            </div>
                                            <div>
                                                <span>Deposit</span>
                                                <span>${budget * 1.1} USDC</span>
                                            </div>
                                        </div>
                                        <div className={styles['publish-info']}>
                                            <span className={styles['font-size--small']}>*You can always withdraw</span>
                                            <span>Top Up Wallet +</span>
                                        </div>
                                        <button className={styles['publish-go-live']} onClick={() => depositFunds(budget)}>Deposit</button>
                                    </>
                                ) : deploying === 'depositing' ? (
                                    <div className={styles['publish-deploying-content']}>
                                        <Spinner />
                                        <p>Waiting for confirmation</p>
                                        <p>Confirm this transaction in your wallet</p>
                                    </div>
                                ) : deploying === 'deposit_success' ? (
                                    <div className={styles['publish-deploying-content']}>
                                        <SugarIcon width={100} height={100} />
                                        <p>Your project is live!</p>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </>
                ) : <DepositFundsToWallet />
            }
        </Modal>
    )
}

export default PublishProjectModal;
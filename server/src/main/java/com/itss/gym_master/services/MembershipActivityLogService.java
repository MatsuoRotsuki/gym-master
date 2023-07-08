package com.itss.gym_master.services;

import com.itss.gym_master.entities.MemberMembership;
import com.itss.gym_master.entities.MembershipActivityLog;
import com.itss.gym_master.entities.Payment;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.exceptions.NotEnoughRequiredAmountException;
import com.itss.gym_master.repositories.MemberMembershipRepository;
import com.itss.gym_master.repositories.MembershipActivityLogRepository;
import com.itss.gym_master.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MembershipActivityLogService {
    private final MembershipActivityLogRepository membershipActivityLogRepository;
    private final PaymentRepository paymentRepository;
    private final MemberMembershipRepository memberMembershipRepository;

    @Autowired
    public MembershipActivityLogService(MembershipActivityLogRepository membershipActivityLogRepository,
                                        PaymentRepository paymentRepository,
                                        MemberMembershipRepository memberMembershipRepository) {
        this.membershipActivityLogRepository = membershipActivityLogRepository;
        this.paymentRepository = paymentRepository;
        this.memberMembershipRepository = memberMembershipRepository;
    }

    public List<MembershipActivityLog> getAllMembershipActivityLogs() {
        return membershipActivityLogRepository.findAll();
    }

    public Optional<MembershipActivityLog> getOneMembershipActivityLog(Long id) {
        return membershipActivityLogRepository.findById(id);
    }

    public MembershipActivityLog confirmPayment(Long id, Payment payment) {
        MembershipActivityLog targetedLog = membershipActivityLogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found membership activity log with id " + id));
        if (targetedLog.getPayment() != null) {
            throw new RuntimeException("This activity got paid. Abort");
        }

        Long requiredAmount = targetedLog.getPeriodOfMonths() * targetedLog.getMemberMembership().getMembership().getMonthlyPrice();
        if (requiredAmount.equals(payment.getAmount())) {
            Payment newPayment = paymentRepository.save(payment);
            targetedLog.setPayment(newPayment);

            MemberMembership targetedMemberMembership = targetedLog.getMemberMembership();
            targetedMemberMembership.setHasActivated(true);
            if (targetedLog.getType() == 0) //Register new
            {
                targetedMemberMembership.setValidFrom(LocalDate.now());
                targetedMemberMembership.setValidUntil(LocalDate.now().plusMonths(targetedLog.getPeriodOfMonths()));
            } else if (targetedLog.getType() == 1) //Renew
            {
                LocalDate currentValidUntil = targetedMemberMembership.getValidUntil();
                if (currentValidUntil.isBefore(LocalDate.now())) {
                    //Expired
                    LocalDate newValidFrom = LocalDate.now();
                    targetedMemberMembership.setValidFrom(newValidFrom);
                    LocalDate newValidUntil = newValidFrom.plusMonths(targetedLog.getPeriodOfMonths());

                    targetedMemberMembership.setValidUntil(newValidUntil);
                } else {
                    //Not expired
                    LocalDate newValidUntil = currentValidUntil.plusMonths(targetedLog.getPeriodOfMonths());
                    targetedMemberMembership.setValidUntil(newValidUntil);
                }
            }
            memberMembershipRepository.save(targetedMemberMembership);

            return membershipActivityLogRepository.save(targetedLog);
        } else {
            //Throw exception: số tiền bạn nhập không đủ thanh toán cho hoạt động này.
            throw new NotEnoughRequiredAmountException("Not enough amount for this activity. Required amount is " + requiredAmount + " but inputed is " + payment.getAmount() + ". Abort");
        }
    }

    public MembershipActivityLog abortPayment(Long id) {
        MembershipActivityLog log = membershipActivityLogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found membership activity log with id " + id));
        memberMembershipRepository.deleteById(id);
        return log;
    }
}

package com.itss.gym_master.services;

import com.itss.gym_master.entities.Feedback;
import com.itss.gym_master.entities.Gym;
import com.itss.gym_master.entities.Member;
import com.itss.gym_master.entities.User;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.FeedbackRepository;
import com.itss.gym_master.repositories.GymRepository;
import com.itss.gym_master.repositories.MemberRepository;
import com.itss.gym_master.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final GymRepository gymRepository;
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;

    @Autowired
    public MemberService(
            MemberRepository memberRepository,
            GymRepository gymRepository,
            FeedbackRepository feedbackRepository,
            UserRepository userRepository) {
        this.memberRepository = memberRepository;
        this.gymRepository = gymRepository;
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
    }

    /**
     * Lấy danh sách tất cả hội viên
     *
     * @return danh sách tất cả hội viên
     */
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    /**
     * Thêm mới một hội viên
     *
     * @param member thông tin hội viên dùng để tạo mới
     * @return thông tin hội viên vừa được tạo mới
     */
    public Member newMember(Member member) {
        User newUser = member.getUser();
        newUser.setRole(3);
        userRepository.save(newUser);
        return memberRepository.save(member);
    }

    /**
     * Lấy thông tin của một hội viên cụ thể
     *
     * @param id mã ID của hội viên
     * @return thông tin hội viên
     */
    public Optional<Member> getOneMember(Long id) {
        return memberRepository.findById(id);
    }

    /**
     * Chỉnh sửa thông tin một hội viên
     *
     * @param id        mã ID của hội viên
     * @param newMember thông tin đã chỉnh sửa của hội viên
     * @return thông tin hội viên sau khi chỉnh sửa
     */
    public Member editMember(Long id, Member newMember) {
        return memberRepository.findById(id).map(member -> {
            member.setJoinedDate(newMember.getJoinedDate());
            member.setWeight(newMember.getWeight());
            member.setHealthCondition(newMember.getHealthCondition());
            member.setIsBanned(newMember.getIsBanned());
            member.setBannedReason(newMember.getBannedReason());
            member.setNote(newMember.getNote());

            User currentUser = member.getUser();
            User newUser = newMember.getUser();
            userRepository.findById(currentUser.getId()).map(user -> {
                user.setDateOfBirth(newUser.getDateOfBirth());
                user.setGender(newUser.getGender());
                user.setAddress(newUser.getAddress());
                user.setPhoneNumber(newUser.getPhoneNumber());
                user.setFirstName(newUser.getFirstName());
                user.setLastName(newUser.getLastName());
                return userRepository.save(user);
            });

            return memberRepository.save(member);
        }).orElseThrow(() -> new EntityNotFoundException("Could not found member with id " + id));
    }

    /**
     * Xóa thông tin của một hội viên cụ thể
     *
     * @param id mã ID của hội viên
     * @return thông tin của hội viên dã xóa
     */
    public Optional<Member> removeMember(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        memberRepository.deleteById(id);
        return member;
    }

    public Feedback createFeedback(Long memberId, Long gymId, Feedback feedback) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member with id: " + memberId));
        Gym gym = gymRepository.findById(gymId)
                .orElseThrow(() -> new EntityNotFoundException("Could not found gym with id: " + gymId));
        feedback.setMember(member);
        feedback.setGym(gym);
        return feedbackRepository.save(feedback);
    }

    public Member banMember(Long id, String banReason) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member with id " + id));
        member.setIsBanned(true);
        member.setBannedReason(banReason);
        memberRepository.save(member);

        return member;
    }

    public Member unbanMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Could not found member with id " + id));
        member.setIsBanned(false);
        member.setBannedReason(null);
        return member;
    }
}

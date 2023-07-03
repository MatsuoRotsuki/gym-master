package com.itss.gym_master.services;

import com.itss.gym_master.entities.Staff;
import com.itss.gym_master.entities.User;
import com.itss.gym_master.exceptions.EntityNotFoundException;
import com.itss.gym_master.repositories.StaffRepository;
import com.itss.gym_master.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;

    @Autowired
    public StaffService(StaffRepository staffRepository,
                        UserRepository userRepository) {
        this.staffRepository = staffRepository;
        this.userRepository = userRepository;
    }

    /**
     * Lấy danh sách tất cả nhân viên
     * @return danh sách tất cả nhân viên
     */
    public List<Staff> getAllStaffs() {
        return staffRepository.findAll();
    }

    /**
     * Thêm mới một nhân viên
     * @param staff Thông tin nhân viên dùng để tạo mới
     * @return Thông tin nhân viên vừa được tạo mới
     */
    public Staff newStaff(Staff staff) {
        User newUser = staff.getUser();
        newUser.setRole(2);
        userRepository.save(newUser);
        return staffRepository.save(staff);
    }

    /**
     * Lấy thông tin của một nhân viên cụ thể
     * @param id mã ID của nhân viên
     * @return thôn tin của nhân viên
     */
    public Optional<Staff> getOneStaff(Long id) {
        return staffRepository.findById(id);
    }

    /**
     * Chỉnh sửa thông tin của nhân viên
     * @param id mã ID của nhân viên
     * @param newStaff thông tin đã chỉnh sửa của nhân viên
     * @return thông tin nhân viên sau khi chỉnh sửa
     */
    public Staff editStaff(Long id, Staff newStaff) {
        return staffRepository.findById(id).map(staff -> {
            staff.setPosition(newStaff.getPosition());
            staff.setNote(newStaff.getNote());
            staff.setHiredDate(newStaff.getHiredDate());
            staff.setEmploymentStatus(newStaff.getEmploymentStatus());
            staff.setSalary(newStaff.getSalary());

            User newUser = newStaff.getUser();
            User currentUser = staff.getUser();
            userRepository.findById(currentUser.getId()).map(user -> {
                user.setPasswordDigest(newUser.getPasswordDigest());
                user.setDateOfBirth(newUser.getDateOfBirth());
                user.setGender(newUser.getGender());
                user.setAddress(newUser.getAddress());
                user.setPhoneNumber(newUser.getPhoneNumber());
                return userRepository.save(user);
            });

            return staffRepository.save(staff);
        }).orElseThrow(() -> new EntityNotFoundException("Could not found staff with id " + id));
    }

    /**
     * Xóa thông tin của một nhân viên cụ thể
     * @param id mã ID của nhân viên
     * @return thông tin của nhân viên đã xóa
     */
    public Optional<Staff> removeStaff(Long id) {
        Optional<Staff> staff = staffRepository.findById(id);
        if (staff.isPresent()){
            userRepository.deleteById(staff.get().getUser().getId());
            staffRepository.deleteById(id);
        }
        return staff;
    }


}
package com.itss.gym_master.repositories;

import com.itss.gym_master.entities.MembershipActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipActivityLogRepository extends JpaRepository<MembershipActivityLog, Long> {
}
